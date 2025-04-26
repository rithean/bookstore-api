import express from "express";
import {
  createGenreController,
  deleteGenreController,
  getAllGenresController,
  getGenreByIdController,
  updateGenreController,
} from "../controllers/genre.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/create",
  authenticate,
  authorize(["admin"]),
  createGenreController
);
router.get("/", authenticate, getAllGenresController);
router.get("/:id", authenticate, getGenreByIdController);
router.put(
  "/update/:id",
  authenticate,
  authorize(["admin"]),
  updateGenreController
);
router.delete(
  "/delete/:id",
  authenticate,
  authorize(["admin"]),
  deleteGenreController
);

export default router;
