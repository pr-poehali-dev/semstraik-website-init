
CREATE TABLE IF NOT EXISTS t_p29720556_semstraik_website_in.users (
  id BIGINT PRIMARY KEY,
  username VARCHAR(64) NOT NULL UNIQUE,
  password_hash VARCHAR(256) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  sem_balance INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO t_p29720556_semstraik_website_in.users (id, username, password_hash, is_admin)
VALUES (10000000, 'DezeYT', 'ermolovo4_placeholder', TRUE);
