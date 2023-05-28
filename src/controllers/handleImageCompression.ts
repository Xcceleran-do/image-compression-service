import { Request, Response } from "express";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const compressedImageLocation = path.join(
  __dirname,
  "..",
  "..",
  "uploads",
  `image${Math.floor(Math.random() * 10000)}.jpeg`
);
export const handleImageCompression = (req: Request, res: Response) => {
  // todo get the quality from the request body

  // make sure the file extension is jpeg
  if (req.file?.mimetype !== "image/jpeg") {
    return res.status(400).json({ message: "Only jpeg images are allowed" });
  }

  const image = req.file;

  // doc: https://sharp.pixelplumbing.com/api-output#jpeg

  sharp(image?.path)
    .jpeg({ quality: 80 })
    .toFile(compressedImageLocation)
    .then(() => {
      // delete the original file
      fs.unlink(image?.path, (err) => {
        if (err) {
          console.log(err);
        }
      });

      res.sendFile(compressedImageLocation);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    });
};
