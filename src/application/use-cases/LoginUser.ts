import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { generateToken } from "@/src/infrastructure/auth/jwt";
import bcrypt from 'bcrypt'

export const loginUser = (repo: IUserRepository) => async (email: string, password: string) => {
    const user = await repo.findByEmail(email);
    if (!user || !(await bcrypt.compare(password,user.password))) {
        throw new Error('Invalid credentials');
    }
    return generateToken({id: user.id, email: user.email});
}