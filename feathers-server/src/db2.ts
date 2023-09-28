// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import { knex, Knex } from "knex";
import type { Application } from "./declarations";
import { DB2Config, DB2Dialect } from "@bdkinc/knex-ibmi";

declare module "./declarations" {
  interface Configuration {
    db2Client: Knex;
  }
}

export const config: DB2Config = {
  client: DB2Dialect,
  connection: {
    database: "your odbc connection name",
    host: "your host ip address",
    port: 50000,
    user: "username",
    password: "password",
    driver: "IBM i Access ODBC Driver",
    connectionStringParams: {
      CMT: 0,
      NAM: 1,
      DBQ: "QGPL"
    },
    pool: {
      max: 100,
      min: 2
    }
  },
  pool: {
    max: 100,
    min: 2
  }
};

export const db2 = (app: Application) => {
  const db = knex(config!);

  app.set("db2Client", db);
};
