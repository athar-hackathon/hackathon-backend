import { generateToken } from '@/src/infrastructure/auth/jwt';
import { Profile } from 'passport-google-oauth20';
import { IUserRepository } from '@/src/domain/repositories/IUserRepository';
import bcrypt from "bcrypt";

export const handleGoogleLogin = async (repo: IUserRepository, profile: Profile) => {
  const email = profile.emails?.[0]?.value;
  
  console.log(profile)
  if (!email) {
    throw new Error('Email not found in Google profile');
  }
  
//   let user = await repo.findByEmail(email);
//   const hashed = await bcrypt.hash("password", 10);

//   if (!user) {
//     user = await repo.createUser({
//       email,
//       name: profile.displayName,
//       password: hashed,
//       isActive: false,
//       role: 'volunteer',
//       city: '',
//       country: '',
//     });
//   }

//   const token = generateToken({ id: user.id, email: user.email });
//   console.log(token)
  return { email, name };
};
