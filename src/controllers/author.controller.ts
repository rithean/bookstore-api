import { Request, Response } from "express";
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../services/author.service";
import { errorResponse, successResponse } from "../utils/response";

export const createAuthorController = async (req: Request, res: Response) => {
  try {
    const authorData = req.body;
    await createAuthor(authorData);
    successResponse(res, 201, "Author created successfully.");
  } catch (error: any) {
    errorResponse(
      res,
      500,
      "An unexpected error occurred while creating the author.",
      error
    );
  }
};

export const getAllAuthorsController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const authors = await getAllAuthors();
    if (authors.length === 0) {
      return errorResponse(res, 404, "No authors found.");
    }
    successResponse(res, 200, authors);
  } catch (error: any) {
    console.error("Error fetching authors:", error);
    errorResponse(
      res,
      500,
      "An unexpected error occurred while fetching the authors.",
      error
    );
  }
};


export const getAuthorByIdController = async (req: Request, res: Response) => {
  try {
    const authorId = parseInt(req.params.id);
    const author = await getAuthorById(authorId);
    if (!author) {
      errorResponse(res, 404, "Author not found.");
    }
    successResponse(res, 200, author);
  } catch (error: any) {
    errorResponse(
      res,
      500,
      "An unexpected error occurred while fetching the author.",
      error
    );
  }
};

export const updateAuthorController = async (req: Request, res: Response) => {
  try {
    const authorId = parseInt(req.params.id);
    const authorData = req.body;
    await updateAuthor(authorId, authorData);
    successResponse(res, 200, "Author updated successfully.");
  } catch (error: any) {
    errorResponse(
      res,
      500,
      "An unexpected error occurred while updating the author.",
      error
    );
  }
};

export const deleteAuthorController = async (req: Request, res: Response) => {
  try {
    const authorId = parseInt(req.params.id);
    await deleteAuthor(authorId);
    successResponse(res, 200, "Author deleted successfully.");
  } catch (error: any) {
    errorResponse(
      res,
      500,
      "An unexpected error occurred while deleting the author.",
      error
    );
  }
};
