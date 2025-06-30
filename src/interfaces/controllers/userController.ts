import { createUser } from "@/src/application/use-cases/CreateUser";
import { UserRepository } from "@/src/infrastructure/repositories/UserRepository";
import { Request, Response } from "express";
import { createAssociation } from "@/src/application/use-cases/CreateAssociation";

function isErrorResult(result: any): result is { error: string } {
  return result && typeof result === "object" && "error" in result;
}

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password, name, age, gender, country, city, profilePicture, role, associationName, associationDescription, associationPicture } = req.body;
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

  let association = null;
  if (role === "associationOwner") {
    association = await createAssociation({
      name: associationName,
      description: associationDescription,
      intagram_url: "",
      facebook_url: "",
      twitter_url: "",
      owner_id: result.id,
    });
  }

  res.status(201).json({data: result, association });
};
