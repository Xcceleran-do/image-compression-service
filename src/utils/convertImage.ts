import sharp from "sharp";
import { ConvertData } from "../types";
export const convertImage = async ({ image, type, location }: ConvertData) => {
  const convertedImage = await sharp(image?.path)
    .toFormat(type)
    .toFile(location);
  console.log(convertedImage);
  return convertedImage;
};
