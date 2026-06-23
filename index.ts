import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Log connection errors so we can see the real problem
pool.on("error", (err) => {
  console.error("PostgreSQL pool error:", err.message, err.stack);
});

// Test connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error("FATAL: Cannot connect to database:", err.message);
  } else {
    console.log("Database connection successful");
    release();
  }
});

export const db = drizzle(pool, { schema });

export * from "./schema";
