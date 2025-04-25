import { Request, Response } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../services/book.service";
import { errorResponse, successResponse } from "../utils/response";

export const createBookController = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    await createBook(bookData);
    successResponse(res, 201, "Book created successfully.");
  } catch (error: any) {
    errorResponse(
      res,
      500,
      "An unexpected error occurred while creating the book.",
      error
    );
  }
};

export const getAllBookController = async (req: Request, res: Response) => {
  try {
    const books = await getAllBooks();
    if (books.length === 0) {
      errorResponse(res, 404, "No books found.");
    }
    successResponse(res, 200, books);
  } catch (error: any) {
    errorResponse(
      res,
      500,
      "An unexpected error occurred while fetching the books.",
      error
    );
  }
};

export const getBookByIdController = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await getBookById(bookId);
    if (!book) {
      errorResponse(res, 404, "Book not found.");
    }
    successResponse(res, 200, book);
  } catch (error: any) {
    errorResponse(
      res,
      500,
      "An unexpected error occurred while fetching the book.",
      error
    );
  }
};

export const updateBookController = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  const bookData = req.body;
  try {
    await updateBook(bookId, bookData);
    successResponse(res, 200, "Book updated successfully.");
  } catch (error: any) {
    errorResponse(
      res,
      500,
      "An unexpected error occurred while updating the book.",
      error
    );
  }
};

export const deleteBookController = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  try {
    await deleteBook(bookId);
    successResponse(res, 200, "Book deleted successfully.");
  } catch (error: any) {
    errorResponse(
      res,
      500,
      "An unexpected error occurred while deleting the book.",
      error
    );
  }
};
