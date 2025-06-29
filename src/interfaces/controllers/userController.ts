import { createUser } from "@/src/application/use-cases/CreateUser";
import { UserRepository } from "@/src/infrastructure/repositories/UserRepository";
import { Request, Response } from "express";

function isErrorResult(result: any): result is { error: string } {
  return result && typeof result === "object" && "error" in result;
}

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password, name, age, gender, country, city, profilePicture, role } = req.body;
  const result = await createUser(UserRepository)(
    email,
    password,
    name,
    age,
    gender,
    country,
    city,
    profilePicture,
    role,
  );

  if (isErrorResult(result)) {
    res.status(409).json({ error: result.error });
    return;
  }

  res.status(201).json(result);
};
