import React, { useRef, useEffect, useState } from "react";
import s from "./productUi.module.scss";
import Gesture from "../Gesture/Gesture";
import Resize from "../Resize-image/Resize";
import ResizeImage from "../Resize-image/ResizeImage";
import DragMove from "../Drag-move/DragMove";

function App() {
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
  });

  const handleDragMove = (e: any) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    });
  };

  return (
    <div className={s.App}>
      <Gesture />

      {/* <section className={s.AppHeader}>
        <DragMove onDragMove={handleDragMove}>
          <div
            id="drag"
            draggable={false}
            style={{
              transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
            }}
          >
            <span className={s.span}></span>
          </div>
        </DragMove>
      </section> */}
    </div>
  );
}

export default App;
