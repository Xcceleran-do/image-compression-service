import { Request, Response } from "express";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { compressImage } from "../utils/compressImage";

export const handleImageCompression = async (req: Request, res: Response) => {
  // todo get the quality from the request body

  // make sure the file extension is jpeg
  if (req.file?.mimetype !== "image/jpeg") {
    return res.status(400).json({ message: "Only jpeg images are allowed" });
  }

  const image = req.file;
  const compressedImageLocation = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    `image${Math.floor(Math.random() * 10000)}.jpeg`
  );
  try {
    await compressImage({
      image,
      quality: 80,
      location: compressedImageLocation,
    });

    // delete the original image
    fs.unlink(image?.path, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.sendFile(compressedImageLocation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
