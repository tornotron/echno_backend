import { pool } from "../database.js";

async function PemployeedbCreate(employee) {
  try {
    await pool.query(
      `INSERT INTO employees(employee_id,employee_name,employee_role,employee_status,company_email,phone_number) VALUES($1,$2,$3,$4,$5,$6)`,
      [
        employee.employeeId,
        employee.employeeName,
        employee.employeeRole,
        employee.employeeStatus,
        employee.companyEmail,
        employee.phoneNumber,
      ],
    );
  } catch (error) {
    console.error("Error creating employees table");
  }
}

async function Pemployeefetch() {
  try {
    const employeeData = await pool.query(`SELECT * FROM employees`);
    return employeeData.rows;
  } catch (error) {
    console.error("Error fetching employees");
  }
}

export { PemployeedbCreate, Pemployeefetch };
