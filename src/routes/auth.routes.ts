import express from "express";
import {
  registerController,
  loginController,
  refreshController,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh-token", refreshController);

export default router;
