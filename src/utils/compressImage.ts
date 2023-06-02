import sharp from "sharp";
import { CompressionData } from "../types";
import { parentPort } from "worker_threads";

const compressImage = async ({ image, location, quality }: CompressionData) => {
  const compressedImage = await sharp(image?.path)
    .jpeg({ quality: quality })
    .toFile(location);
  parentPort?.postMessage(compressedImage);
};

parentPort?.on("message", (message) => compressImage(message));
