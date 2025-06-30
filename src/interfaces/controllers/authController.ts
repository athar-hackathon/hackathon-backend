import { loginUser } from "@/src/application/use-cases/LoginUser";
import { UserRepository } from "@/src/infrastructure/repositories/UserRepository";
import { Request, Response } from "express";
import { createUser } from "@/src/application/use-cases/CreateUser";
import { createAssociation } from "@/src/application/use-cases/CreateAssociation";

function isErrorResult(result: any): result is { error: string } {
  return result && typeof result === "object" && "error" in result;
}

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

export const register = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { email, profilePicture, password, name, age, gender, country, city, role } = req.body;
    let {associationData} = req.body
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
    let association;
    if(role == 'associationOwner' && result)
    {
        associationData = {...associationData, owner_id: result.id}
        console.log('Association data:', associationData);
        association = await createAssociation(associationData)
    }
  
    res.status(201).json({data: {user: result, association}});
  };
  
