import jwt, { JwtPayload, SignOptions, Secret } from "jsonwebtoken";

// Default SignOptions for expiration time
const DEFAULT_SIGN_OPTIONS: SignOptions = {
  expiresIn: "1h", // Default expiration time
};

// Generate Access Token
export function generateAccessToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTIONS
): string {
  const secret = process.env.JWT_SECRET as string;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  return jwt.sign(payload, secret, options);
}

// Generate Refresh Token
export function generateRefreshToken(
  payload: JwtPayload,
  options: SignOptions = { expiresIn: "30d" }
): string {
  const secret = process.env.REFRESH_TOKEN_SECRET as string;

  if (!secret) {
    throw new Error(
      "REFRESH_TOKEN_SECRET is not defined in the environment variables."
    );
  }

  return jwt.sign(payload, secret, options);
}

// Verify Access Token
export const verifyAccessToken = (token: string) => {
  const secret = process.env.JWT_SECRET as string;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  try {
    return jwt.verify(token, secret) as JwtPayload; // Return decoded payload
  } catch (error) {
    throw new Error("Invalid or expired access token.");
  }
};

// Verify Refresh Token
export const verifyRefreshToken = (token: string) => {
  const secret = process.env.REFRESH_TOKEN_SECRET as string;

  if (!secret) {
    throw new Error(
      "REFRESH_TOKEN_SECRET is not defined in the environment variables."
    );
  }

  try {
    return jwt.verify(token, secret) as JwtPayload; // Return decoded payload
  } catch (error) {
    throw new Error("Invalid or expired refresh token.");
  }
};
