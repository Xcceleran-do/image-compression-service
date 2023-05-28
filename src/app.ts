import express from "express";
import compressionRouter from "./routes/compressImageRoutes";

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const uptime = process.uptime();
  const time = new Date().toLocaleTimeString();
  const data = {
    "Server is running for": `${uptime.toFixed(0)} seconds`,
    "current time is": `${time}`,
  };
  res.json(data);
});

app.use("/api/v1/compress", compressionRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
