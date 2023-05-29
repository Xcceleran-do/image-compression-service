import sharp from "sharp";

interface CompressionData {
  image: Express.Multer.File;
  quality: number;
  location: string;
}
export const compressImage = async ({
  image,
  quality,
  location,
}: CompressionData) => {
  // doc: https://sharp.pixelplumbing.com/api-output#jpeg
  const compressedImage = await sharp(image?.path)
    .jpeg({ quality: quality })
    .toFile(location);

  return compressedImage;
};
