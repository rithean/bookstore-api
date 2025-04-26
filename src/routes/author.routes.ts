import express from "express";
import {
  createAuthorController,
  deleteAuthorController,
  getAllAuthorsController,
  getAuthorByIdController,
  updateAuthorController,
} from "../controllers/author.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/create",
  authenticate,
  authorize(["admin"]),
  createAuthorController
);
router.get("/", authenticate, getAllAuthorsController);
router.get("/:id", authenticate, getAuthorByIdController);
router.put(
  "/update/:id",
  authenticate,
  authorize(["admin"]),
  updateAuthorController
);
router.delete(
  "/delete/:id",
  authenticate,
  authorize(["admin"]),
  deleteAuthorController
);

export default router;
