import fs from "fs";

export const deleteOldImage = ({
  imageLocation,
}: {
  imageLocation: string;
}) => {
  fs.unlink(imageLocation, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File deleted successfully");
    }
  });
};
