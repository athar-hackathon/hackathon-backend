import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,

  db: {
    name: process.env.DB_NAME || 'postgres',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'your-default-secret',
    expiresIn: '7d', 
  },

  cors: {
    developmentMode: process.env.FRONTEND_URL || "http://localhost:3000",
    deploymentMode: process.env.FRONTEND_URL || "http://localhost:3000",
  }
};