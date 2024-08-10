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
    const inventorydbcheck = await pool.query(
      `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'inventory') AS table_existence`,
    );
    if (inventorydbcheck.rows[0]["table_existence"] == true) {
      console.log("Inventory table exists");
    } else {
      await pool.query(
        `CREATE TABLE inventory (item_id UUID PRIMARY KEY,item_name VARCHAR(255),location VARCHAR(255),statusofitem BOOLEAN)`,
      );
      console.log("Inventory table created");
    }
    const inventoryrequestsdbcheck = await pool.query(
      `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'inventoryrequests') AS table_existence`,
    );
    if (inventoryrequestsdbcheck.rows[0]["table_existence"] == true) {
      console.log("Inventoryrequests table exists");
    } else {
      await pool.query(
        `CREATE TABLE inventoryrequests (request_id UUID PRIMARY KEY,requested_items TEXT[],status VARCHAR(255),location VARCHAR(255),available_items json)`,
      );
      console.log("Inventoryrequests table created");
    }

    const employeesdbcheck = await pool.query(
      `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'employees') AS table_existence`,
    );
    if (employeesdbcheck.rows[0]["table_existence"] == true) {
      console.log("employees table exists");
    } else {
      await pool.query(
        `CREATE TABLE employees (employee_id UUID PRIMARY KEY,employee_name VARCHAR(255),employee_role VARCHAR(255),employee_status BOOLEAN,company_email VARCHAR(255),phone_number VARCHAR(255))`,
      );
      console.log("employees table created");
    }

    const userdbcheck = await pool.query(
      `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') AS table_existence`,
    );
    if (userdbcheck.rows[0]["table_existence"] == true) {
      console.log("users table exists");
    } else {
      await pool.query(
        `CREATE TABLE users (user_name VARCHAR(255) PRIMARY KEY,salt VARCHAR(255),passhash VARCHAR(255))`,
      );
      console.log("users table created");
    }
  } catch (error) {
    console.error(`Error creating database: ${error.message}`);
  }
}

export { pool, dbsetup };
