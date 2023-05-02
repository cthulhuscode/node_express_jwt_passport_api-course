import { Pool } from "pg";
import { config } from "../config";

const options: any = {};

if (config.isProd) {
  options.connectionString = config.dbUrl;
  options.ssl = {
    rejectUnauthorized: false,
  };
} else {
  const USER = encodeURIComponent(config.dbUser!);
  const PASSWORD = encodeURIComponent(config.dbPassword!);
  options.connectionString = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

export const pool = new Pool(options);
