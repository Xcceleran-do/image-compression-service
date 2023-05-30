import express from "express";
import { handleImageCompression } from "../controllers/handleImageCompression";
import { handleImageResize } from "../controllers/handleImageResize";
import { upload } from "../config/multer";

const router = express.Router();

router.post("/", upload.single("image"), handleImageCompression);
router.post("/resize", upload.single("image"), handleImageResize);
export default router;
