import asyncHandler from "express-async-handler";
import {
  PemployeedbCreate,
  Pemployeefetch,
  PemployeeSpecificFetch,
  PemployeeUpdate,
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
  const {
    employeeId,
    employeeName,
    employeeRole,
    employeeStatus,
    companyEmail,
    phoneNumber,
  } = req.query;

  const filteredParams = {};
  if (employeeId) filteredParams.employeeId = employeeId;
  if (employeeName) filteredParams.employeeName = employeeName;
  if (employeeRole) filteredParams.employeeRole = employeeRole;
  if (employeeStatus) filteredParams.employeeStatus = employeeStatus;
  if (companyEmail) filteredParams.companyEmail = companyEmail;
  if (phoneNumber) filteredParams.phoneNumber = phoneNumber;
  if (Object.keys(filteredParams).length > 0) {
    const specificEmployeeData = await PemployeeSpecificFetch(filteredParams);
    res.status(200).json(specificEmployeeData);
  } else {
    const employee = await Pemployeefetch();
    res.status(200).json(employee);
  }
});

const updateEmployees = asyncHandler(async (req, res) => {
  const {
    employeeName,
    employeeRole,
    employeeStatus,
    companyEmail,
    phoneNumber,
  } = req.query;

  const { employeeId } = req.body;

  const updatedEmployee = {
    employee_id: employeeId,
    employee_name: employeeName,
    employee_role: employeeRole,
    employee_status: employeeStatus,
    company_email: companyEmail,
    phone_number: phoneNumber,
  };

  if (!employeeId) {
    res.status(400);
    throw new Error("Employee ID is required");
  }
  if (updatedEmployee["employee_name"] != undefined) {
    await PemployeeUpdate(updatedEmployee, "employee_name");
    res.status(200).json({
      message: `Employee name successfully updated to ${req.query.employeeName}`,
    });
  }
  if (updatedEmployee["employee_role"] != undefined) {
    await PemployeeUpdate(updatedEmployee, "employee_role");
    res.status(200).json({
      message: `Employee role successfully updated to ${req.query.employeeRole}`,
    });
  }
  if (updatedEmployee["employee_status"] != undefined) {
    await PemployeeUpdate(updatedEmployee, "employee_status");
    res.status(200).json({
      message: `Employee status successfully updated to ${req.query.employeeStatus}`,
    });
  }
  if (updatedEmployee["company_email"] != undefined) {
    await PemployeeUpdate(updatedEmployee, "company_email");
    res.status(200).json({
      message: `Employee company email successfully updated to ${req.query.companyEmail}`,
    });
  }
  if (updatedEmployee["phone_number"] != undefined) {
    await PemployeeUpdate(updatedEmployee, "phone_number");
    res.status(200).json({
      message: `Employee phone number successfully updated to ${req.query.phoneNumber}`,
    });
  }
});

export { dbCreate, getEmployees, updateEmployees };
