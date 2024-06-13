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

async function PemployeeSpecificFetch(filteredParams) {
  try {
    if (
      filteredParams.employeeName &&
      filteredParams.employeeRole &&
      filteredParams.employeeStatus &&
      filteredParams.companyEmail &&
      filteredParams.phoneNumber
    ) {
      const result = await pool.query(
        `SELECT * FROM employees WHERE employee_name = $1 AND employee_role = $2 AND employee_status = $3 AND company_email = $4 AND phone_number = $5`,
        [
          filteredParams.employeeName,
          filteredParams.employeeRole,
          filteredParams.employeeStatus,
          filteredParams.companyEmail,
          filteredParams.phoneNumber,
        ],
      );
      return result.rows;
    }
    if (filteredParams.employeeId) {
      const result = await pool.query(
        `SELECT * FROM employees WHERE employee_id = $1`,
        [filteredParams.employeeId],
      );
      return result.rows;
    }
    if (filteredParams.employeeName) {
      const result = await pool.query(
        `SELECT * FROM employees WHERE employee_name = $1`,
        [filteredParams.employeeName],
      );
      return result.rows;
    }
    if (filteredParams.employeeRole) {
      const result = await pool.query(
        `SELECT * FROM employees WHERE employee_role = $1`,
        [filteredParams.employeeRole],
      );
      return result.rows;
    }
    if (filteredParams.employeeStatus) {
      const result = await pool.query(
        `SELECT * FROM employees WHERE employee_status = $1`,
        [filteredParams.employeeStatus],
      );
      return result.rows;
    }
    if (filteredParams.companyEmail) {
      const result = await pool.query(
        `SELECT * FROM employees WHERE company_email = $1`,
        [filteredParams.companyEmail],
      );
      return result.rows;
    }
    if (filteredParams.phoneNumber) {
      const result = await pool.query(
        `SELECT * FROM employees WHERE phone_number = $1`,
        [filteredParams.phoneNumber],
      );
      return result.rows;
    }
  } catch (error) {
    console.error("Error fetching employees");
  }
}

async function PemployeeUpdate(updateData, colName) {
  try {
    const column_name = colName;
    const query = `UPDATE employees SET ${column_name} = $1 WHERE employee_id = $2`;
    await pool.query(query, [updateData[colName], updateData["employee_id"]]);
  } catch (error) {}
  console.error("Error updating employee");
}

async function PemployeeDelete(employeeId) {
  try {
    await pool.query(`DELETE FROM employees WHERE employee_id = $1`, [
      employeeId,
    ]);
  } catch (error) {
    console.error("Error deleting employee");
  }
}

export {
  PemployeedbCreate,
  Pemployeefetch,
  PemployeeSpecificFetch,
  PemployeeUpdate,
  PemployeeDelete,
};
