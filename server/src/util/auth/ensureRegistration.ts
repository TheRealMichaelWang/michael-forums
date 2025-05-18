import { UserService } from "../../services/userService";
import { AuthenticatedRequest } from "./authRequest";
import { NextFunction, Response } from "express";
import { container } from "../container";

// This middleware ensures that clerk session claims users are registered in the database.
// If the user is not registered, it will create a new user in the database.
export async function ensureRegistration(
  req: AuthenticatedRequest,
  _: Response,
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