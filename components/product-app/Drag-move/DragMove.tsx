import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function DragMove(props: any) {
  const {
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onDragMove,
    children,
    style,
    className,
    isSvg = false,
  } = props;

  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: any) => {
    setIsDragging(true);
    onPointerDown(e);
  };

  const handlePointerUp = (e: any) => {
    setIsDragging(false);
    onPointerUp(e);
  };

  const handlePointerMove = (e: any) => {
    if (isDragging) onDragMove(e);
    onPointerMove(e);
  };

  const handlePointerLeave = (e: any) => {
    setIsDragging(false);
    onPointerUp(e);
  };

  useEffect(() => {
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("mouseup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, []);

  const Tag = isSvg ? "g" : "div";

  return (
    <Tag
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      // onPointerDown={handlePointerDown}
      // onPointerMove={handlePointerMove}
      // onPointerLeave={handlePointerLeave}
      style={style}
      className={className}
    >
      {children}
    </Tag>
  );
}

const { func, element, shape, bool, string } = PropTypes;

DragMove.propTypes = {
  onDragMove: func.isRequired,
  onPointerDown: func,
  onPointerUp: func,
  onPointerMove: func,
  children: element,
  style: shape({}),
  className: string,
  isSvg: bool,
};

DragMove.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};
