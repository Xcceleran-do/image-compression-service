import sharp from "sharp";
import { ResizeData } from "../types";

export const resizeImage = async ({
  image,
  width,
  height,
  location,
}: ResizeData) => {
  const resizedImage = await sharp(image?.path)
    .resize({ width, height, kernel: "nearest" })
    .toFile(location);

  return resizedImage;
};
