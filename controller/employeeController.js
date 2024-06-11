import asyncHandler from "express-async-handler";
import {
  PemployeedbCreate,
  Pemployeefetch,
} from "../db/relational_domain/employee_postgres_database.js";
import { v4 as uuidv4 } from "uuid";

const dbCreate = asyncHandler(async (req, res) => {
  const employeeId = uuidv4();
  const {
    employeeName,
    employeeRole,
    companyEmail,
    phoneNumber,
    employeeStatus,
  } = req.body;
  if (
    !employeeName ||
    !employeeRole ||
    !companyEmail ||
    !phoneNumber ||
    !employeeStatus
  ) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const employee = {
    employeeId: employeeId,
    employeeName: employeeName,
    employeeRole: employeeRole,
    employeeStatus: employeeStatus,
    companyEmail: companyEmail,
    phoneNumber: phoneNumber,
  };
  await PemployeedbCreate(employee);
  res
    .status(200)
    .json({ message: "Employee created successfully", employeeId: employeeId });
  console.log(employee);
});

const getEmployees = asyncHandler(async (req, res) => {
  const employee = await Pemployeefetch();
  res.status(200).json(employee);
});

export { dbCreate, getEmployees };
