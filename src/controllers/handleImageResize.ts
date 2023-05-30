import { Request, Response } from "express";
import fs from "fs";
import { resizeImage } from "../utils/resizeImage";
import { generateImageLocation } from "../utils/generateImageLocation";

export const handleImageResize = async (req: Request, res: Response) => {
  const image = req.file!;
  const { width, height } = req.body;
  const imageExtension = image?.mimetype.split("/")[1];
  const resizedImageLocation = generateImageLocation(imageExtension!);

  try {
    await resizeImage({
      image,
      width: 1800,
      height: 600,
      location: resizedImageLocation,
    });

    fs.unlink(image?.path, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.sendFile(resizedImageLocation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
