import express from 'express'
import authRoutes from './interfaces/routes/authRoutes';
import userRoutes from './interfaces/routes/userRoutes';
import planRouter from './interfaces/routes/planRoutes';
import adminRouter from './interfaces/routes/adminRoutes';
import locationRouter from './interfaces/routes/locationRoutes';
import reviewRouter from './interfaces/routes/reviewRoutes';
import guestRouter from './interfaces/routes/guestRoutes';
import { setupSwagger } from './infrastructure/swagger/swagger';
import cors from "cors";
import path from 'path';
import cookieParser from 'cookie-parser';
import fileRouter from './interfaces/routes/fileRoutes';
import { config } from "@/src/config";
import './infrastructure/auth/passport';
import passport from 'passport';
import session from 'express-session';
import associationRoutes from "@/src/interfaces/routes/associationRoutes";

const  app = express();

// CORS middleware should be first
const corsOptions = {
    origin: '*',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  };
app.use(cors(corsOptions));

app.use(express.json())
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

setupSwagger(app);
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
app.use("/api/association", associationRoutes);
app.use("/api/guest", guestRouter);

export default app