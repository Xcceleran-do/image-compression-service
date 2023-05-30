import { Request, Response } from "express";
import fs from "fs";
import { resizeImage } from "../utils/resizeImage";
import { generateImageLocation } from "../utils/generateImageLocation";

export const handleImageResize = async (req: Request, res: Response) => {
  const image = req.file!;
  const { width, height } = req.query;
  const imageExtension = image?.mimetype.split("/")[1];
  const resizedImageLocation = generateImageLocation(imageExtension!);

  if (!width || !height || isNaN(Number(width)) || isNaN(Number(height))) {
    return res.status(400).json({ message: "Please provide width and height" });
  }

  const [widthVal, heightVal] = [Number(width), Number(height)];

  try {
    await resizeImage({
      image,
      width: widthVal,
      height: heightVal,
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
