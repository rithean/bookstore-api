import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/create", createUserController);
router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.put("/update/:id", updateUserController);
router.delete("/delete/:id", deleteUserController);

export default router;
