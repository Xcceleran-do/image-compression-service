import { Request, Response } from "express";
import path from "path";
import fs from "fs";

import { convertImage } from "../utils/convertImage";
export const handleImageConversion = async (req: Request, res: Response) => {
  const image = req.file;
  const type = "webp";
  const compressedImageLocation = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    `image${Math.floor(Math.random() * 10000)}.${type}`
  );

  try {
    const img = await convertImage({
      image,
      type,
      location: compressedImageLocation,
    });

    // delete the original image
    image &&
      fs.unlink(image?.path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    // todo send the data to s3 bucket , and then delete the compressed image from the server
    res.sendFile(compressedImageLocation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
