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

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL
  },

  cors: {
    developmentMode: process.env.FRONTEND_URL || "http://localhost:3000",
    deploymentMode: [
      process.env.FRONTEND_URL_NET || "http://localhost:3000",
      "https://oxyjeunes-dashboard.vercel.app",
      "https://oxyjeunes-dashboard-git-main-akram-sas-projects.vercel.app"
    ],
  }
};