import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import bcrypt from "bcrypt";
export const createUser =
  (repo: IUserRepository) => async (email: string, password: string, name: string) => {
    const hashed = await bcrypt.hash(password, 10);
    const user = await repo.findByEmail(email)
    if (user){
        return {"error": "user is exist"}
    }else{
        return repo.createUser({ email, password: hashed, name });
    }
  };
