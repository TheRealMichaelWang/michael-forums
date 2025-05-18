import { UserService } from "../../services/userService";
import { AuthenticatedRequest } from "./authRequest";
import { NextFunction, Response } from "express";
import { container } from "../container";

export async function ensureRegistration(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userService = container.get<UserService>(UserService);
    const sessionClaims = req.auth?.sessionClaims;
    
    if (sessionClaims) {
        await userService.ensureUserExists(sessionClaims);
    }
  } catch (error) {
    console.error("Error ensuring user registration:", error);
  }

  next();
}