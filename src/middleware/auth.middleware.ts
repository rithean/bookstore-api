import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { errorResponse } from "../utils/response";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Authentication Middleware
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, 401, "Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, 401, "Unauthorized");
  }
};

// Authorization Middleware
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(res, 403, "Forbidden");
    }
    next();
  };
};
