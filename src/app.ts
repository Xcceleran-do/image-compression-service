import express from "express";
import helmet from "helmet";

import { upload } from "./config/multer";
import compressionRouter from "./routes/compressImageRoutes";
import morganMiddleware from "./middleware/morgan.middleware";
import { validateImage } from "./middleware/validate.middleware";
import { removeOldImage } from "./jobs/removeOldImage";

const app = express();
removeOldImage();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);
app.use(helmet());

app.get("/", (req, res) => {
  const uptime = process.uptime();
  const time = new Date().toLocaleTimeString();
  const data = {
    "Server is running for": `${uptime.toFixed(0)} seconds`,
    "current time is": `${time}`,
  };
  res.json(data);
});

app.use(
  "/api/v1/image",
  upload.single("image"),
  validateImage,
  compressionRouter
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
