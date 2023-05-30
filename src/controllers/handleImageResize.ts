import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { resizeImage } from "../utils/resizeImage";

export const handleImageResize = async (req: Request, res: Response) => {
  const { width, height } = req.body;

  const image = req.file;

  // make sure the file extension is jpeg
  if (req.file?.mimetype !== "image/jpeg") {
    return res.status(400).json({ message: "Only jpeg images are allowed" });
  }

  const compressedImageLocation = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    `image${Math.floor(Math.random() * 10000)}.jpeg`
  );
  try {
    await resizeImage({
      image,
      width: 1800,
      height: 600,
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
