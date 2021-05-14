DROP SCHEMA IF EXISTS app_public CASCADE;

DROP ROLE IF EXISTS app_role;

CREATE ROLE app_role;

CREATE SCHEMA IF NOT EXISTS app_public;

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA app_public;

GRANT usage ON SCHEMA app_public TO app_role;

ALTER DEFAULT privileges REVOKE EXECUTE ON functions FROM public;

REVOKE ALL ON DATABASE app_public FROM PUBLIC;

REVOKE ALL ON SCHEMA public FROM PUBLIC;

CREATE TABLE IF NOT EXISTS app_public.foo (
  id serial PRIMARY KEY,
  title text NOT NULL,
  secondcol text,
  thirdcol text
);

GRANT SELECT ON TABLE app_public.foo TO app_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE app_public.foo TO app_role;

INSERT INTO app_public.foo (title, secondcol, thirdcol)
  VALUES ('one', 'seccol', 'def'), ('two', 'seccol2', 'abc'), ('three', 'seccol3', 'test3');

CREATE OR REPLACE FUNCTION app_public.foo_test_ha (o app_public.foo)
  RETURNS text
  AS $$
  SELECT
    'text'
$$
LANGUAGE sql
STABLE;

GRANT EXECUTE ON FUNCTION app_public.foo_test_ha (app_public.foo) TO app_role;
COMMENT ON FUNCTION app_public.foo_test_ha (app_public.foo) IS E'@sortable';
