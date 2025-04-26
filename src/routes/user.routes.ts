import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../controllers/user.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/create",
  authenticate,
  authorize(["admin"]),
  createUserController
);
router.get("/", authenticate, getAllUsersController);
router.get("/:id", authenticate, getUserByIdController);
router.put(
  "/update/:id",
  authenticate,
  authorize(["admin"]),
  updateUserController
);
router.delete(
  "/delete/:id",
  authenticate,
  authorize(["admin"]),
  deleteUserController
);

export default router;
