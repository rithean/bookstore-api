import { Response } from "express";

interface ApiResponse {
  status: boolean;
  message?: string;
  data?: any;
}

export const successResponse = (
  res: Response,
  statusCode: number = 200,
  dataOrMessage?: any,
  data?: any
): Response<ApiResponse> => {
  let response: ApiResponse = {
    status: true,
  };

  if (typeof dataOrMessage === "string") {
    response.message = dataOrMessage;
    if (data !== undefined) {
      response.data = data;
    }
  } else {
    response.data = dataOrMessage;
  }

  return res.status(statusCode).json(response);
};

export const errorResponse = (
  res: Response,
  statusCode: number = 500,
  message?: string,
  error?: any
): Response<ApiResponse> => {
  let response: ApiResponse = {
    status: false,
  };

  if (message) response.message = message;
  if (error !== undefined) response.data = error;

  return res.status(statusCode).json(response);
};
