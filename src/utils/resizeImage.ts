import sharp from "sharp";

interface ResizeData {
  image: Express.Multer.File | undefined;
  width: number;
  height: number;
  location: string;
}

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
