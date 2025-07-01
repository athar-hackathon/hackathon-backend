import { verifyToken } from '@/src/infrastructure/auth/jwt';
import { Request, Response, NextFunction } from 'express';
import { config } from '@/src/config';

export interface AuthRequest extends Request {
  user?: any;
}

export const verifyTokenMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  console.log('Token received:', token.substring(0, 20) + '...');
  console.log('JWT Secret:', config.jwt.secret ? 'Set' : 'Not set');

  try {
    const decoded = verifyToken(token)
    console.log('Token decoded successfully:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('Token verification failed:', err);
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};

export const isAdminMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ message: 'Forbidden: Admins only' });
    return;
  }
  next();
};
