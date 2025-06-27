import { createUser } from "@/src/application/use-cases/CreateUser";
import { UserRepository } from "@/src/infrastructure/repositories/UserRepository";
import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await createUser(UserRepository)(email, password);
  res.status(201).json(result);
};
