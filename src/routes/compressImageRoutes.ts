import express from "express";
import { handleImageCompression } from "../controllers/handleImageCompression";
import { handleImageResize } from "../controllers/handleImageResize";
import { handleImageConversion } from "../controllers/handleImageConversion";

const router = express.Router();

router.post("/compress", handleImageCompression);
router.post("/resize", handleImageResize);
router.post("/convert", handleImageConversion);
export default router;
