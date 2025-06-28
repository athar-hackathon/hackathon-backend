import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { config } from '@/src/config';
import { handleGoogleLogin } from '@/src/application/use-cases/HandleGoogleLogin';
import { UserRepository } from "@/src/infrastructure/repositories/UserRepository";

passport.use(new GoogleStrategy({
  clientID: config.google.clientId || '',
  clientSecret: config.google.clientSecret || '',
  callbackURL: config.google.callbackUrl || '',
}, async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: (error: any, user?: any) => void
) => {
  try {
    const result = await handleGoogleLogin(UserRepository, profile);
    done(null, result);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((result: any, done) => done(null, result.user.get('id')));
passport.deserializeUser((id: string, done) => done(null, { id }));
