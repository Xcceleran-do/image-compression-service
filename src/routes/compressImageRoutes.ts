import express from "express";
import { handleImageCompression } from "../controllers/handleImageCompression";
import { handleImageResize } from "../controllers/handleImageResize";
import { handleImageConversion } from "../controllers/handleImageConversion";
import { handleDefaultConfiguration } from "../controllers/handleDefaultConfiguration";
const router = express.Router();

router.post("/compress", handleImageCompression);
router.post("/resize", handleImageResize);
router.post("/convert", handleImageConversion);
router.post("/default", handleDefaultConfiguration);

export default router;
