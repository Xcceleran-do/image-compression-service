import multer from "multer";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, crypto.randomBytes(20).toString("hex"));
  },
});
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB in bytes
  },
});
