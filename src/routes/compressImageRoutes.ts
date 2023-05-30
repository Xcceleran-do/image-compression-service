import express from "express";
import { handleImageCompression } from "../controllers/handleImageCompression";
import { handleImageResize } from "../controllers/handleImageResize";
import { handleImageConversion } from "../controllers/handleImageConversion";

import { upload } from "../config/multer";

const router = express.Router();

router.post("/compress", upload.single("image"), handleImageCompression);
router.post("/resize", upload.single("image"), handleImageResize);
router.post("/convert", upload.single("image"), handleImageConversion);
export default router;
