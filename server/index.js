import express from 'express';
import { postgraphile } from 'postgraphile';
import PgOrderByMultiColumnIndexPlugin from './PgOrderByMultiColumnIndexPlugin';
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';
import ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter';

const port = process.env.PORT || 8081;
const postgraphileOptions = {
  pgSettings: (req) => {
    const settings = {};
    settings['role'] = 'app_role';
    settings['user.sub'] = '123123123213123';
    settings['user.firstname'] = '123123123213123';
    settings['user.lastname'] = '123123123213123';
    return settings;
  },
  appendPlugins: [
    PgSimplifyInflectorPlugin,
    ConnectionFilterPlugin,
    // PgOrderByRelatedPlugin,
    PgOrderByMultiColumnIndexPlugin,
  ],
  graphileBuildOptions: {
    orderByNullsLast: true,
    connectionFilterAllowNullInput: true, // default: false
    connectionFilterAllowEmptyObjectInput: true,
    connectionFilterRelations: true,
    connectionFilterSetofFunctions: true,
    connectionFilterComputedColumns: true,
  },
  subscriptions: false,
  exportGqlSchemaPath: 'schema.graphql',
  watchPg: true,
  ignoreRBAC: false,
  graphiql: true,
  enhanceGraphiql: true,
  enableQueryBatching: true,
  showErrorStack: 'json',
  ownerConnectionString: process.env.ROOT_DATABASE_URL,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  allowExplain: true,
  disableQueryLog: false,
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
  console.log(`Pricing service listening on http://localhost:${port}/graphiql`);
});
