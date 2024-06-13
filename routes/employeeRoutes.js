import { Router } from "express";
import {
  dbCreate,
  getEmployees,
  updateEmployees,
  deleteEmployees,
} from "../controller/employeeController.js";

const router = Router();

router.route("/create").post(dbCreate);

router.route("/fetch").get(getEmployees);

router.route("/update").put(updateEmployees);

router.route("/delete").delete(deleteEmployees);

export default router;
