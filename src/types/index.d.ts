export interface CompressionData {
  image: Express.Multer.File;
  quality: number;
  location: string;
}
export interface ResizeData {
  image: Express.Multer.File | undefined;
  width: number;
  height: number;
  location: string;
}
export interface ConvertData {
  image: Express.Multer.File | undefined;
  type: "webp" | "png" | "tiff" | "jpeg" | "avif" | "heif" | "raw";
  location: string;
}
