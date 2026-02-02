import { Request, Response, NextFunction } from "express";
import { HttpException } from "../utils/http.exception";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.API_KEY) {
    next(new HttpException(401, "Unauthorized: Invalid API Key"));
  } else {
    next();
  }
};
