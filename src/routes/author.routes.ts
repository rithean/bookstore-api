import express from "express";
import {
  createAuthorController,
  deleteAuthorController,
  getAllAuthorsController,
  getAuthorByIdController,
  updateAuthorController,
} from "../controllers/author.controller";

const router = express.Router();

router.post("/create", createAuthorController);
router.get("/", getAllAuthorsController);
router.get("/:id", getAuthorByIdController);
router.put("/update/:id", updateAuthorController);
router.delete("/delete/:id", deleteAuthorController);

export default router;
