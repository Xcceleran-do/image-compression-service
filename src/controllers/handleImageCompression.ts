import { Request, Response } from "express";
import fs from "fs";
import { compressImage } from "../utils/compressImage";
import { generateImageLocation } from "../utils/generateImageLocation";

export const handleImageCompression = async (req: Request, res: Response) => {
  const image = req.file!;
  const imageExtension = image?.mimetype.split("/")[1];
  const compressedImageLocation = generateImageLocation(imageExtension!);

  try {
    await compressImage({
      image,
      quality: 80,
      location: compressedImageLocation,
    });

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
