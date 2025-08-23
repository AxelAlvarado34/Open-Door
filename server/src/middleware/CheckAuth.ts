
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.model";

export interface AuthRequest extends Request {
  user: User;
}

export const checkAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies._token;

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ error: "Invalid token" });
  }
};
