import { Request, Response, NextFunction } from "express";

export const validateImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const image = req.file;

  // make sure the file extension is jpeg
  if (req.file?.mimetype.startsWith("image")) {
    return res.status(400).json({ message: "Only image formats are allowed" });
  }

  const validExtensions = [
    "webp",
    "png",
    "tiff",
    "jpeg",
    "avif",
    "heif",
    "raw",
  ];

  const imageExtension = image?.mimetype.split("/")[1];

  if (!imageExtension || !validExtensions.includes(imageExtension)) {
    return res.status(400).json({ message: "Invalid image extension" });
  }

  next();
};
