import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
} from "../services/auth.service";
import { errorResponse, successResponse } from "../utils/response";
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from "../validations/auth.validation";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      errorResponse(res, 400, error.details.map((e) => e.message).join(","));
    }

    const { name, email, password } = req.body;

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
    const { error } = loginSchema.validate(req.body);

    if (error) {
      errorResponse(res, 400, error.details.map((e) => e.message).join(","));
    }

    const { email, password } = req.body;

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
    const { error } = refreshTokenSchema.validate(req.body);

    if (error) {
      errorResponse(res, 400, error.details.map((e) => e.message).join(","));
    }
    const { refreshToken } = req.body;
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
