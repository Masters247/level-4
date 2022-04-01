import { useEffect, useState } from "react";

const ImageConverter = ({ imageData, setImageWidth, setImageHeight }: any) => {
  console.log("image data", imageData);
  useEffect(() => {
    if (imageData !== null) {
      var i = new Image();

      i.src = imageData[0].data_url;

      setImageWidth(i.width);
      setImageHeight(i.height);

      console.log("i", i.width);
      console.log("i", i.height);
    }
  });

  return <></>;
};

export default ImageConverter;
