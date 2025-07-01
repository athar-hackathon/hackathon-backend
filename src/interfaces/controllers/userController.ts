import { createUser } from "@/src/application/use-cases/CreateUser";
import { UserRepository } from "@/src/infrastructure/repositories/UserRepository";
import { Request, Response } from "express";
import { createAssociation } from "@/src/application/use-cases/CreateAssociation";
import { getBase64Image } from "@/src/infrastructure/services/getBase64Image";

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

export const getMyProfile = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const userId = user?.id as string | undefined;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const dbUser = await UserRepository.findByEmail(user.email);
  if (!dbUser) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  if (dbUser.profilePicture) {
    dbUser.profilePicture = getBase64Image(dbUser.profilePicture);
  }
  if (dbUser.password) {
    // Create a new object without the password field instead of using delete
    const { password: _, ...userWithoutPassword } = dbUser;
    res.json(userWithoutPassword);
    return;
  }
  res.json(dbUser);
};

export const updateMyProfile = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const userId = user?.id as string | undefined;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const updateData = req.body;
  // Prevent updating email or id
  delete updateData.email;
  delete updateData.id;
  const updatedUser = await UserRepository.update(userId, updateData);
  if (!updatedUser) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  // Remove password from response
  const { password: _, ...userWithoutPassword } = updatedUser;
  res.json({ success: true, data: userWithoutPassword, message: "Profile updated successfully" });
};

export const deleteMyProfile = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const userId = user?.id as string | undefined;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const deleted = await UserRepository.delete(userId);
  if (!deleted) {
    res.status(404).json({ error: "User not found or already deleted" });
    return;
  }
  res.json({ success: true, message: "User profile deleted successfully" });
};
