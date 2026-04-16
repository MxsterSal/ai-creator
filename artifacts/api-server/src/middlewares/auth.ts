import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ error: "No token" });
    return;
  }

  try {
    (req as any).user = jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
};
