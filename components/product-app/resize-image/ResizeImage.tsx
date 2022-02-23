import { useState, useEffect, useRef } from "react";
import Rotate from "../../ui/icons/Rotate";
import Image from "next/image";
import s from "./resizeImage.module.scss";

const ResizeImage = () => {
  const ref = useRef(null);
  const refLeft = useRef(null);
  const refTop = useRef(null);
  const refRight = useRef(null);
  const refBottom = useRef(null);
  const refRotate = useRef(null);

  useEffect(() => {
    const resizeableEle: any = ref.current;
    const styles = window.getComputedStyle(resizeableEle);
    let width = parseInt(styles.width, 10);
    let rotate = 0;

    // let height = parseInt(styles.height, 10);
    let x = 0;
    // let y = 0;

    resizeableEle.style.top = "50px";
    resizeableEle.style.left = "50px";

    // Right resize
    const onMouseMoveRightResize = (event: any) => {
      console.log("rotate");
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      resizeableEle.style.width = `${width}px`;
      resizeableEle.style.height = `${width}px`;
    };

    const onMouseDownRightResize = (event: any) => {
      console.log("event right");
      x = event.clientX;
      resizeableEle.style.left = styles.left;
      resizeableEle.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    const onMouseUpRightResize = (event: any) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    // Add mouse down event listener
    const resizerRight: any = refRight.current;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);

    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
    };
  }, []);

  return (
    <div className={s.container}>
      <div ref={ref} className={s.resizeable}>
        <div className={s.imageWrap}>
          <Image
            src="/TheLogoMan.png"
            width={70}
            height={70}
            layout="responsive"
            priority={true}
          />
        </div>
        <div className={s.rotateWrap}>
          <Rotate styles={s.rotateIcon} />
          <div ref={refRotate} className={`${s.resizer} ${s.rotate}`}></div>
        </div>
        <div ref={refLeft} className={`${s.resizer} ${s.resizerLeft}`}></div>
        <div ref={refTop} className={`${s.resizer} ${s.resizerTop}`}></div>
        <div ref={refRight} className={`${s.resizer} ${s.resizerRight}`}></div>
        <div
          ref={refBottom}
          className={`${s.resizer} ${s.resizerBottom}`}
        ></div>
      </div>
    </div>
  );
};

export default ResizeImage;
