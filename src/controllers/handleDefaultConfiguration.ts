import { Request, Response } from "express";
import { generateImageLocation } from "../utils/generateImageLocation";
import { compressImage } from "../utils/compressImage";
import { resizeImage } from "../utils/resizeImage";
import { convertImage } from "../utils/convertImage";

export const handleDefaultConfiguration = async (
  req: Request,
  res: Response
) => {
  const image = req.file!;
  const { width, height, quality, type } = req.query;
  const imageExtension = image?.mimetype.split("/")[1];
  const compressedImageLocation = generateImageLocation(imageExtension!);
  console.log(compressedImageLocation);
  if (
    typeof quality !== "undefined" &&
    (isNaN(Number(quality)) || Number(quality) < 1 || Number(quality) > 100)
  ) {
    return res
      .status(400)
      .json({ message: "Quality param should range from 1 to 100 " });
  }

  if (!width || !height || isNaN(Number(width)) || isNaN(Number(height))) {
    return res.status(400).json({ message: "Please provide width and height" });
  }

  const [widthVal, heightVal] = [Number(width), Number(height)];

  try {
    await compressImage({
      image,
      quality: quality ? Number(quality) : 80,
      location: compressedImageLocation,
    });

    await resizeImage({
      image,
      width: widthVal,
      height: heightVal,
      location: compressedImageLocation,
    });

    await convertImage({
      image,
      // @ts-ignore
      type: "webp",
      location: compressedImageLocation,
    });

    res.sendFile(compressedImageLocation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
