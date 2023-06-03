import express from "express";
import { handleImageCompression } from "../controllers/handleImageCompression";
import { handleImageResize } from "../controllers/handleImageResize";
import { handleImageConversion } from "../controllers/handleImageConversion";
import { handleDefaultConfiguration } from "../controllers/handleDefaultConfiguration";
import { validateQuality } from "../middleware/validate.quality.middleware";

const router = express.Router();

router.post("/compress", validateQuality, handleImageCompression);
router.post("/resize", handleImageResize);
router.post("/convert", handleImageConversion);
router.post("/default", handleDefaultConfiguration);

export default router;
