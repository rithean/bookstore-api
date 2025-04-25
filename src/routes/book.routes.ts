import express from "express";
import {
  createBookController,
  deleteBookController,
  getAllBookController,
  getBookByIdController,
  updateBookController,
} from "../controllers/book.controller";

const router = express.Router();

router.post("/create", createBookController);
router.get("/", getAllBookController);
router.get("/:id", getBookByIdController);
router.put("/update/:id", updateBookController);
router.delete("/delete/:id", deleteBookController);

export default router;
