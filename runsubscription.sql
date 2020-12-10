select pg_notify(
	  'postgraphile:hello',
	  '{}'
);

