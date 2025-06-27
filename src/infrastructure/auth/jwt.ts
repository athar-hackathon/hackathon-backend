import jwt from 'jsonwebtoken'
import { config } from '@/src/config';

export function generateToken(payload: object) {
    return jwt.sign(payload, config.jwt.secret!, {expiresIn: parseInt(config.jwt.expiresIn)})
}