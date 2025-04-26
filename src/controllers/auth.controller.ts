import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
} from "../services/auth.service";
import { errorResponse, successResponse } from "../utils/response";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      errorResponse(res, 400, "All fields are required.");
    }

    await registerUser({ name, email, password });

    successResponse(res, 201, "User registered successfully");
  } catch (error: any) {
    console.error("Error registering user:", error);
    errorResponse(
      res,
      500,
      "An unexpected error occurred while registering user"
    );
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      errorResponse(res, 400, "All fields are required.");
    }

    const { accessToken, refreshToken, user } = await loginUser(
      email,
      password
    );

    successResponse(res, 200, "Login successful", {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Error logging in user:", error);
    errorResponse(res, 500, "An unexpected error occurred during login");
  }
};

export const refreshController = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      errorResponse(res, 400, "Refresh token is required.");
    }

    const { accessToken } = await refreshAccessToken(refreshToken);

    successResponse(res, 200, "Token refreshed successfully", { accessToken });
  } catch (error: any) {
    console.error("Error refreshing access token:", error);
    errorResponse(
      res,
      500,
      "An unexpected error occurred during token refresh"
    );
  }
};
