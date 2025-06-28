import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import bcrypt from "bcrypt";
export const createUser =
  (repo: IUserRepository) =>
  async (email: string, password: string, name: string, phone: number, age: number, gender: 'FEMALE'|'MALE', locationId: number) => {
    const hashed = await bcrypt.hash(password, 10);
    const user = await repo.findByEmail(email);
    if (user) {
      return { error: "user is exist" };
    } else {
      return repo.createUser({
        email,
        password: hashed,
        name,
        phone,
        age,
        gender,
        locationId,
      });
    }
  };
