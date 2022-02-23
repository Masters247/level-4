import { useState, useEffect, useRef } from "react";
import Rotate from "../../ui/icons/Rotate";
import Image from "next/image";
import s from "./resizeImage.module.scss";

const Resize = () => {
  const ref = useRef(null);
  const refLeft = useRef(null);
  const refTop = useRef(null);
  const refRight = useRef(null);
  const refBottom = useRef(null);
  const refRotate = useRef(null);

  useEffect(() => {
    const rotatableEle: any = ref.current;
    const styles = window.getComputedStyle(rotatableEle);
    const rotatable = rotatableEle;
    console.log(rotatable);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;

    rotatableEle.style.top = "50px";
    rotatableEle.style.left = "50px";

    const onMouseDownMoveRotate = (e: any) => {
      var deg = 0;
      console.log("move");
      const x = e.clientX;
      rotatableEle.style.transform = `rotate(${deg}deg)`;
    };

    const onMouseDownRotate = (e: any) => {
      console.log("click", e);
      document.addEventListener("mousemove", onMouseDownMoveRotate);
      document.addEventListener("mouseup", onMouseUpRotate);
    };

    const onMouseUpRotate = (e: any) => {
      document.removeEventListener("mousemove", onMouseDownMoveRotate);
    };

    const resizerRight: any = refRotate.current;
    resizerRight.addEventListener("mousedown", onMouseDownRotate);

    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRotate);
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

export default Resize;
