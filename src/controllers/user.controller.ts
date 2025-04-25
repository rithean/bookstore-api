import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../services/user.service";
import { errorResponse, successResponse } from "../utils/response";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    await createUser(userData);
    successResponse(res, 201, "User created successfully.");
  } catch (error: any) {
    errorResponse(res, 500, error.message, error);
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    successResponse(res, 200, users);
  } catch (error: any) {
    errorResponse(res, 500, error.message, error);
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await getUserById(userId);
    successResponse(res, 200, user);
  } catch (error: any) {
    errorResponse(res, 500, error.message, error);
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;
    await updateUser(userId, userData);
    successResponse(res, 200, "User updated successfully.");
  } catch (error: any) {
    errorResponse(res, 500, error.message, error);
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    await deleteUser(userId);
    successResponse(res, 200, "User deleted successfully.");
  } catch (error: any) {
    errorResponse(res, 500, error.message, error);
  }
};
