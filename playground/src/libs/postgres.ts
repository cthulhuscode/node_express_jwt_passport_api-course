import { Client } from "pg";

export async function getConnection() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "enrique",
    password: "rootxd",
    database: "my_db",
  });

  await client.connect();
  return client;
}
