import React, { useState, useEffect } from "react";

const DragMove = (props: any) => {
  const {
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onDragMove,
    children,
    style,
    className,
  } = props;

  const [isDragging, setIsDragging] = useState(false);

  // useEffect(() => {
  //   // console.log(window);
  // }, []);

  const handlePointerDown = (e: any) => {
    console.log("Pointer Down");
    setIsDragging(true);
    onPointerDown(e);
  };

  const handlePointerUp = (e: any) => {
    console.log("Pointer Up");
    setIsDragging(false);
    onPointerUp(e);
  };

  const handlePointerMove = (e: any) => {
    console.log("Pointer Move");
    if (isDragging) onDragMove(e);
    onPointerMove(e);
  };

  const handlePointerLeave = (e: any) => {
    console.log("Pointer leave");
    setIsDragging(false);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
};

export default DragMove;

DragMove.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};
