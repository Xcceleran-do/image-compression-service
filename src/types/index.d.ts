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
