import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import bcrypt from "bcrypt";
export const createUser =
  (repo: IUserRepository) => async (email: string, password: string) => {
    const hashed = await bcrypt.hash(password, 10);
    return repo.createUser({ email, password: hashed });
  };
