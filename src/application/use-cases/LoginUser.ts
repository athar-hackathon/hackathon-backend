import { IUserRepository } from "@/src/domain/repositories/IUserRepository";
import { generateToken } from "@/src/infrastructure/auth/jwt";
import bcrypt from 'bcrypt'

export const loginUser = (repo: IUserRepository) => async (email: string, password: string) => {
    const user = await repo.findByEmail(email);
    if (!user || !(await bcrypt.compare(password,user.password))) {
        throw new Error('Invalid credentials');
    }
    
    // Debug: Log user data
    console.log('User found during login:', user);
    console.log('User role:', user.role);
    console.log('User role type:', typeof user.role);
    
    const tokenPayload = {id: user.id, email: user.email, role: user.role};
    console.log('Token payload:', tokenPayload);
    
    return generateToken(tokenPayload);
}