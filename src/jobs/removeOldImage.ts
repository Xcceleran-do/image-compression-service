import corn from "node-cron";
import { deleteOldImage } from "../utils/deleteImage";
import { orphanedImages } from "../state";

export const removeOldImage = () => {
  corn.schedule("* * * * *", () => {
    orphanedImages.forEach((imageLocation) => {
      deleteOldImage({ imageLocation });
    });
  });
};
