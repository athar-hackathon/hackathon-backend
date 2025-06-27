import { Router } from "express";
import { upload } from "../middlewares/uploadMiddleware";
import { uploadFileController } from "../controllers/fileController";

const router = Router();
router.post("/", upload.single("file"), uploadFileController);
export default router;
