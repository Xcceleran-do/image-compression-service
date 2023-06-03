import { Request, Response, NextFunction } from "express";

export const validateQuality = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { quality } = req.query;
  if (
    typeof quality !== "undefined" &&
    (isNaN(Number(quality)) || Number(quality) < 1 || Number(quality) > 100)
  ) {
    return res
      .status(400)
      .json({ message: "Quality param should range from 1 to 100 " });
  }
  next();
};
