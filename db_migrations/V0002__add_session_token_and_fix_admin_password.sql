
ALTER TABLE t_p29720556_semstraik_website_in.users ADD COLUMN IF NOT EXISTS session_token VARCHAR(128);

UPDATE t_p29720556_semstraik_website_in.users
SET password_hash = encode(sha256('ermolovo4'::bytea), 'hex')
WHERE username = 'DezeYT';
