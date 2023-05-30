import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { generateImageLocation } from "../utils/generateImageLocation";

import { convertImage } from "../utils/convertImage";
export const handleImageConversion = async (req: Request, res: Response) => {
  const image = req.file!;
  const type = "webp";
  const convertedImageLocation = generateImageLocation(type);

  try {
    await convertImage({
      image,
      type,
      location: convertedImageLocation,
    });

    fs.unlink(image?.path, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.sendFile(convertedImageLocation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
