import { loginUser } from "@/src/application/use-cases/LoginUser";
import { UserRepository } from "@/src/infrastructure/repositories/UserRepository";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(UserRepository)(email, password);
    res
      .status(201)
      .header("authorization", token)
      .json({ email, message: "Login Successful" });
  } catch {
    res.status(401).json({
      message: "Invalid credentials",
    });
  }
};
