import express from "express";
import {
  createBookController,
  deleteBookController,
  getAllBookController,
  getBookByIdController,
  updateBookController,
} from "../controllers/book.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/create",
  authenticate,
  authorize(["admin"]),
  createBookController
);
router.get("/", authenticate, getAllBookController);
router.get("/:id", authenticate, getBookByIdController);
router.put(
  "/update/:id",
  authenticate,
  authorize(["admin"]),
  updateBookController
);
router.delete(
  "/delete/:id",
  authenticate,
  authorize(["admin"]),
  deleteBookController
);

export default router;
