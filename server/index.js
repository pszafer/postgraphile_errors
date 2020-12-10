const express = require("express");
const { postgraphile, makePluginHook } = require("postgraphile");
const { default: PgPubsub } = require("@graphile/pg-pubsub");

const pluginHook = makePluginHook([PgPubsub]);

const DATABASE_URL = "postgres://postgres:postgres@db/app_public"
const DB_SCHEMA="app_public"
const postgraphileOptions = {
  pluginHook,
  pgSettings: (req) => {
    const settings = {};
    settings["role"] = "app_role";
    return settings;
  },
  subscriptions: true,
  simpleSubscriptions: true,
  graphiql: true,
  enhanceGraphiql: true,
}

const postgraphileMiddleware = postgraphile(DATABASE_URL, DB_SCHEMA, postgraphileOptions)
const port = 8081;

const app = express();
app.use(postgraphileMiddleware);

app.listen(port, () => {
  console.log(`Service listening on http://localhost:${port}/graphiql`);
});
