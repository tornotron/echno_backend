import { Router } from "express";
import { dbCreate } from "../controller/employeeController.js";

const router = Router();

router.route("/createdb").post(dbCreate);

export default router;
