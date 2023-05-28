import express from "express";
import { handleImageCompression } from "../controllers/handleImageCompression";
import { upload } from "../config/multer";

const router = express.Router();

router.post("/", upload.single("image"), handleImageCompression);

export default router;
