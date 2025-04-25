import express from "express";
import {
  createGenreController,
  deleteGenreController,
  getAllGenresController,
  getGenreByIdController,
  updateGenreController,
} from "../controllers/genre.controller";

const router = express.Router();

router.post("/create", createGenreController);
router.get("/", getAllGenresController);
router.get("/:id", getGenreByIdController);
router.put("/update/:id", updateGenreController);
router.delete("/delete/:id", deleteGenreController);

export default router;
