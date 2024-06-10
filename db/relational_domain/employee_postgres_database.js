// import pool from "../database.js";

async function PemployeedbCreate(employee) {
  try {
    // await pool.query(
    //   `CREATE TABLE employees (employee_id VARCHAR(255) PRIMARY KEY,employee_name VARCHAR(255),employee_role VARCHAR(255),employee_status VARCHAR(255),auth_user_email VARCHAR(255),auth_user_id VARCHAR(255),is_email_verified BOOLEAN,phone_number VARCHAR(255),photo_url VARCHAR(255),site_office TEXT[])`,
    // );
  } catch (error) {
    console.error("Error creating employees table");
  }
}

export { PemployeedbCreate };
