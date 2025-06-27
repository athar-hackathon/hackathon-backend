import express from 'express'
import authRoutes from './interfaces/routes/authRoutes';
import userRoutes from './interfaces/routes/userRoutes';
import { setupSwagger } from './infrastructure/swagger/swagger';
import cors from "cors";
import path from 'path';
import cookieParser from 'cookie-parser';
import fileRouter from './interfaces/routes/fileRoutes';
import { config } from "@/src/config";

const  app = express();
app.use(express.json())

setupSwagger(app);
const corsOptions = {
    origin: [
      config.cors.developmentMode,
      config.cors.deploymentMode
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
  
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/upload', fileRouter);

export default app