import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import bcrypt from "bcrypt";
export const createUser =
  (repo: IUserRepository) =>
  async (email: string, password: string, name: string, age: number, gender: 'FEMALE'|'MALE', city: string, country: string) => {
    const hashed = await bcrypt.hash(password, 10);
    const user = await repo.findByEmail(email);
    if (user) {
      return { error: "user is exist" };
    } else {
      return repo.createUser({
        email,
        password: hashed,
        name,
        age,
        gender,
        country,
        city,
        isActive: false,
        role: 'volunteer'
      });
    }
  };
