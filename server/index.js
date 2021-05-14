import express from 'express';
import { postgraphile } from 'postgraphile';

const port = process.env.PORT || 8081;
const postgraphileOptions = {
  pgSettings: (req) => {
    const settings = {};
    settings['role'] = 'app_role';
    return settings;
  },
  ownerConnectionString: process.env.ROOT_DATABASE_URL,
  extendedErrors: ['hint', 'detail', 'errcode', 'notice'],
};
const DATABASE_URL = 'postgres://postgres:postgres@localhost/app_public';
const postgraphileMiddleware = postgraphile(
  DATABASE_URL,
  'app_public',
  postgraphileOptions
);
const app = express();
app.use(postgraphileMiddleware);
app.listen(port, () => {
  console.log(`Postgraphile listening on http://localhost:${port}/graphiql`);
});
