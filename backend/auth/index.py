"""
Авторизация и регистрация пользователей SEMSTRAIK.
Методы: POST /login, POST /register, GET /me
"""

import json
import os
import hashlib
import secrets
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p29720556_semstraik_website_in")

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Session-Id",
}

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def e(v: str) -> str:
    return str(v).replace("'", "''")

def q(cur, sql: str):
    cur.execute(sql)

def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "GET":
        session_id = (event.get("headers") or {}).get("X-Session-Id", "")
        if not session_id:
            return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Не авторизован"})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id, username, is_admin, sem_balance FROM {SCHEMA}.users WHERE session_token = '{e(session_id)}'")
        row = cur.fetchone()
        conn.close()
        if not row:
            return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Сессия не найдена"})}
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({
            "id": row[0], "username": row[1], "is_admin": row[2], "sem_balance": row[3]
        })}

    body = json.loads(event.get("body") or "{}")
    action = body.get("action", "")

    if action == "login":
        username = body.get("username", "").strip()
        password = body.get("password", "")
        if not username or not password:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Укажи ник и пароль"})}
        pw_hash = hash_password(password)
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id, username, is_admin, sem_balance FROM {SCHEMA}.users WHERE username = '{e(username)}' AND password_hash = '{pw_hash}'")
        row = cur.fetchone()
        if not row:
            conn.close()
            return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Неверный ник или пароль"})}
        session_token = secrets.token_hex(32)
        cur.execute(f"UPDATE {SCHEMA}.users SET session_token = '{session_token}' WHERE id = {row[0]}")
        conn.commit()
        conn.close()
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({
            "session_id": session_token,
            "user": {"id": row[0], "username": row[1], "is_admin": row[2], "sem_balance": row[3]}
        })}

    if action == "register":
        username = body.get("username", "").strip()
        password = body.get("password", "")
        if not username or not password:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Укажи ник и пароль"})}
        if len(username) < 3:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Ник минимум 3 символа"})}
        if len(password) < 4:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Пароль минимум 4 символа"})}
        pw_hash = hash_password(password)
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id FROM {SCHEMA}.users WHERE username = '{e(username)}'")
        if cur.fetchone():
            conn.close()
            return {"statusCode": 409, "headers": CORS, "body": json.dumps({"error": "Ник уже занят"})}
        cur.execute(f"SELECT COALESCE(MAX(id)+1, 1) FROM {SCHEMA}.users WHERE id < 10000000")
        new_id = cur.fetchone()[0]
        session_token = secrets.token_hex(32)
        cur.execute(f"INSERT INTO {SCHEMA}.users (id, username, password_hash, is_admin, session_token) VALUES ({new_id}, '{e(username)}', '{pw_hash}', false, '{session_token}')")
        conn.commit()
        conn.close()
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({
            "session_id": session_token,
            "user": {"id": new_id, "username": username, "is_admin": False, "sem_balance": 0}
        })}

    return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Неизвестный action"})}