import express from 'express'
import authRoutes from './interfaces/routes/authRoutes';
import userRoutes from './interfaces/routes/userRoutes';
import planRouter from './interfaces/routes/planRoutes';
import adminRouter from './interfaces/routes/adminRoutes';
import locationRouter from './interfaces/routes/locationRoutes';
import reviewRouter from './interfaces/routes/reviewRoutes';
import { setupSwagger } from './infrastructure/swagger/swagger';
import cors from "cors";
import path from 'path';
import cookieParser from 'cookie-parser';
import fileRouter from './interfaces/routes/fileRoutes';
import { config } from "@/src/config";
import './infrastructure/auth/passport';
import passport from 'passport';
import session from 'express-session';

const  app = express();
app.use(express.json())
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

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
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRouter);
app.use('/api/upload', fileRouter);
app.use('/api/plan', planRouter);
app.use('/api/location', locationRouter);
app.use('/api', reviewRouter);

export default app