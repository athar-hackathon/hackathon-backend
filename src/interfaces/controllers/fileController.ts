import { Request, Response } from "express";
import { uploadImage } from "@/src/application/use-cases/UploadImage";

export const uploadFileController = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const result = await uploadImage(file!);
    res.status(200).json({ message: "File uploaded", data: result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};