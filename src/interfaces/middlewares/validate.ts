import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({
        message: "Validation failed",
        errors: err.errors,
      });
    }
  };
