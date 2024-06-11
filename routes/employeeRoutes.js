import { Router } from "express";
import { dbCreate, getEmployees } from "../controller/employeeController.js";

const router = Router();

router.route("/create").post(dbCreate);

router.route("/fetch").get(getEmployees);

export default router;
