import React, { useState } from "react";
// import logo from "./logo.svg";
import s from "./productUi.module.scss";
import DragMove from "../drag-move/DragMove";
import { text } from "stream/consumers";

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

  // console.log(translate.x);

  return (
    <div className={s.App}>
      <header className={s.AppHeader}>
        <DragMove onDragMove={handleDragMove}>
          <div
            style={{
              // position: "absolute",
              // left: `${translate.x}`,
              // top: `${translate.y}`,
              transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
            }}
          >
            <span className={s.span}></span>
          </div>
        </DragMove>
      </header>
    </div>
  );
}

export default App;
