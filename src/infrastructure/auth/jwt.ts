import jwt from 'jsonwebtoken'
import { config } from '@/src/config';

export function generateToken(payload: object) {
    const secret = config.jwt.secret || 'your-default-secret';
    const token = jwt.sign(payload, secret, {expiresIn: '7d'});
    console.log('Generated token payload:', payload);
    return token;
}

export function verifyToken(token: string): any {
    const secret = config.jwt.secret || 'your-default-secret';
    const decoded = jwt.verify(token, secret);
    console.log('Decoded token:', decoded);
    return decoded;
}