import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function dbsetup() {
  try {
    await pool.query(
      `CREATE TABLE inventory (item_id UUID PRIMARY KEY,item_name VARCHAR(255),location VARCHAR(255),statusofitem BOOLEAN)`,
    );
    await pool.query(
      `CREATE TABLE inventoryrequests (request_id UUID PRIMARY KEY,requested_items TEXT[],status VARCHAR(255),location VARCHAR(255),available_items json)`,
    );
    await pool.query(
      `CREATE TABLE employees (employee_id UUID PRIMARY KEY,employee_name VARCHAR(255),employee_role VARCHAR(255),employee_status BOOLEAN,company_email VARCHAR(255),phone_number VARCHAR(255))`,
    );
  } catch (error) {
    console.error(`Error creating database: ${error.message}`);
  }
}

export { pool, dbsetup };
