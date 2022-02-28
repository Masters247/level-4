import React, { useRef, useEffect, useState } from "react";
import s from "./productUi.module.scss";
import Resize from "../resize-image/Resize";
import ResizeImage from "../resize-image/ResizeImage";
import DragMove from "../drag-move/DragMove";

function App() {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const draggableEle: any = ref.current;
    const styles = window.getComputedStyle(draggableEle);
    const drag = document.getElementById("drag");
    drag?.addEventListener("pointerdown", (e) => pointDown(e));
    drag?.addEventListener("pointerup", (e) => pointUp(e));

    const pointDown = (e: any) => {
      drag?.addEventListener("pointermove", (e) => pointMovement(e));
      console.log("pointdown", e);
    };

    const pointMovement = (e: any) => {
      console.log("pointmove", e);
    };

    const pointUp = (e: any) => {
      console.log("pointup", e);
    };

    // return () => {
    //   drag?.removeEventListener("pointermove", (e) => pointMovement(e));
    // };
  }, []);

  return (
    <div className={s.App}>
      <header className={s.AppHeader} id="drag">
        {/* <DragMove onDragMove={handleDragMove}> */}
        <div
          id="drag"
          draggable={false}
          style={{
            transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
          }}
        >
          <span className={s.span}></span>
        </div>
        {/* <Resize /> */}
        {/* <ResizeImage /> */}
        {/* </DragMove> */}
      </header>
    </div>
  );
}

export default App;
