import { useEffect, useState } from "react";

const ImageConverter = ({ imageData, setImageWidth, setImageHeight }: any) => {
  useEffect(() => {
    if (imageData !== null) {
      let i = new Image();

      //   i.onload = function () {
      //     alert(i.width + ", " + i.height);
      //     // setImageWidth(i.width);
      //   };

      i.src = imageData;
      // console.log("image data", imageData);

      setImageWidth(i.width);
      setImageHeight(i.height);
    }
  });

  return null;
};

export default ImageConverter;
