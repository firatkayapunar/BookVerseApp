import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router
  .route("/registerUser")
  .post(authController.registerUser);

export default router;
