import { Request, Response, NextFunction } from "express";

export const validateImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const image = req.file;
  if (!image)
    return res.status(400).json({ message: "Please upload an image" });

  if (!image?.mimetype.startsWith("image/")) {
    return res.status(400).json({
      message:
        "Only image formats are allowed (webp, png, tiff, jpeg, avif, heif, raw)",
    });
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
