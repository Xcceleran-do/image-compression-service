import { Request, Response } from "express";
import fs from "fs";
import { Worker } from "worker_threads";
import { generateImageLocation } from "../utils/generateImageLocation";
import path from "path";
export const handleImageCompression = async (req: Request, res: Response) => {
  const image = req.file!;
  const { quality } = req.query;
  const imageExtension = image?.mimetype.split("/")[1];
  const compressedImageLocation = generateImageLocation(imageExtension!);
  const compressImageLocation = path.join(
    __dirname,
    "..",
    "utils",
    "compressImage.ts"
  );
  if (
    typeof quality !== "undefined" &&
    (isNaN(Number(quality)) || Number(quality) < 1 || Number(quality) > 100)
  ) {
    return res
      .status(400)
      .json({ message: "Quality param should range from 1 to 100 " });
  }

  const worker = new Worker(compressImageLocation);

  worker.postMessage({
    image,
    quality: quality ? Number(quality) : 80,
    location: compressedImageLocation,
  });

  worker.on("message", (message) => {
    res.sendFile(compressedImageLocation);
  });

  worker.on("error", (err) => {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  });

  worker.on("exit", () => {
    fs.unlink(image?.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
  worker.on("messageerror", (err) => {
    res.status(500).json({ message: "Something went wrong" });
  });
};
