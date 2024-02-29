import { Router } from "express";
import { sendEmail } from "../controllers/sendEmailController.js";
export default Router().post("/sendEmail", sendEmail);
