import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const requestLogger = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      logger.info({
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration: `${duration}ms`,
      });
    });
    next();
  };
};
