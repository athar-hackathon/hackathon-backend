import jwt from 'jsonwebtoken'
import { config } from '@/src/config';

export function generateToken(payload: object) {
    const secret = config.jwt.secret || 'your-default-secret';
    return jwt.sign(payload, secret, {expiresIn: '7d'})
}

export function verifyToken(token: string): any {
    const secret = config.jwt.secret || 'your-default-secret';
    return jwt.verify(token, secret);
}