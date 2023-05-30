import path from "path";
import type { ConvertData } from "../types";
export const generateImageLocation = (
  type: ConvertData["type"] | string
): string =>
  path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    `image${Math.floor(Math.random() * 1000000000)}.${type || "jpeg"}`
  );
