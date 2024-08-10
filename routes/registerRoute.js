import { Router } from "express";
import { userCreate } from "../controller/registerController.js";

const router = Router();

router.route("/").get(userCreate);

export default router;
