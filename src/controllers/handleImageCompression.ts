import { Request, Response } from "express";
import fs from "fs";
import { compressImage } from "../utils/compressImage";
import { generateImageLocation } from "../utils/generateImageLocation";

export const handleImageCompression = async (req: Request, res: Response) => {
  const image = req.file!;
  const { quality } = req.query;
  const imageExtension = image?.mimetype.split("/")[1];
  const compressedImageLocation = generateImageLocation(imageExtension!);

  if (
    typeof quality !== "undefined" &&
    (isNaN(Number(quality)) || Number(quality) < 1 || Number(quality) > 100)
  ) {
    return res
      .status(400)
      .json({ message: "Quality param should range from 1 to 100 " });
  }

  try {
    await compressImage({
      image,
      quality: quality ? Number(quality) : 80,
      location: compressedImageLocation,
    });

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
