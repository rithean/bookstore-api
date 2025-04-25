import { Request, Response } from "express";
import {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} from "../services/genre.service";
import { successResponse, errorResponse } from "../utils/response";

export const createGenreController = async (req: Request, res: Response) => {
  try {
    const genreData = req.body;
    await createGenre(genreData);
    successResponse(res, 201, "Genre created successfully.");
  } catch (error: any) {
    errorResponse(
      res,
      500,
      "An unexpected error occurred while creating the genre.",
      error
    );
  }
};

export const getAllGenresController = async (req: Request, res: Response) => {
  try {
    const genres = await getAllGenres();
    if (genres.length === 0) {
      errorResponse(res, 404, "No genres found.");
    }
    successResponse(res, 200, genres);
  } catch (error: any) {
    errorResponse(
      res,
      500,
      "An unexpected error occurred while fetching genres.",
      error
    );
  }
};

export const getGenreByIdController = async (req: Request, res: Response) => {
  try {
    const genreId = parseInt(req.params.id);
    const genre = await getGenreById(genreId);
    if (!genre) {
      errorResponse(res, 404, "Genre not found.");
    }
    successResponse(res, 200, genre);
  } catch (error: any) {
    errorResponse(
      res,
      500,
      "An unexpected error occurred while fetching the genre.",
      error
    );
  }
};

export const updateGenreController = async (req: Request, res: Response) => {
  try {
    const genreId = parseInt(req.params.id);
    const genreData = req.body;
    await updateGenre(genreId, genreData);
    successResponse(res, 200, "Genre updated successfully.");
  } catch (error: any) {
    errorResponse(
      res,
      500,
      "An unexpected error occurred while updating the genre.",
      error
    );
  }
};

export const deleteGenreController = async (req: Request, res: Response) => {
  try {
    const genreId = parseInt(req.params.id);
    await deleteGenre(genreId);
    successResponse(res, 200, "Genre deleted successfully.");
  } catch (error: any) {
    errorResponse(
      res,
      500,
      "An unexpected error occurred while deleting the genre.",
      error
    );
  }
};
