import { useState, useEffect } from "react";

import Image from "next/image";
import s from "./resizeImage.module.scss";

const ResizeImage = () => {
  const [draggable, setDraggable] = useState();

  useEffect(() => {}, []);

  return (
    <div>
      <div
        className={s.imageReSizerWrap}
        style={{
          width: "100px",
          height: "100px",
        }}
      >
        <button className={s.size}></button>

        {/* <button className={s.size}></button>
        <button className={s.size}></button>
        <button className={s.size}></button>
        <Image
          quality={100}
          priority={true}
          layout="responsive"
          src="/TheLogoMan.png"
          width={70}
          height={70}
        /> */}
      </div>
    </div>
  );
};

export default ResizeImage;
