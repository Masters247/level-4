import { useCallback, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import ProductUiControls from "../ProductUi/productUiControls";

import s from "./test.module.scss";

const Test = () => {
  const [isResizing, setIsResizing] = useState(false);
  const [{ x, y, width, height }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    width: 80,
    height: 80,
  }));

  const containerRef = useRef<HTMLDivElement | null>(null);

  const bind = useDrag(
    (state) => {
      api.set({
        x: state.offset[0],
        y: state.offset[1],
      });
    },
    {
      from: () => {
        return [x.get(), y.get()];
      },
      bounds: () => {
        const containerWidth: any = containerRef.current?.clientWidth;
        const containerHeight: any = containerRef.current?.clientHeight;

        return {
          top: 0,
          left: 0,
          right: containerWidth - width.get(),
          bottom: containerHeight - height.get(),
        };
      },
    }
  );

  const handleCenter = () => {
    const getWidth = width.get() / 2;
    const getHeight = height.get() / 2;
    const containerWidth: any = containerRef.current?.clientWidth;
    const containerHeight: any = containerRef.current?.clientHeight;
    api.set({
      x: containerWidth / 2 - getWidth,
      y: containerHeight / 2 - getHeight,
    });
  };
  const handleVertical = () => {
    const getHeight = height.get() / 2;
    const containerHeight: any = containerRef.current?.clientHeight;
    api.set({
      y: containerHeight / 2 - getHeight,
    });
  };
  const handleHorizontal = () => {
    const getWidth = width.get() / 2;
    const containerWidth: any = containerRef.current?.clientWidth;
    api.set({
      x: containerWidth / 2 - getWidth,
    });
  };

  const onResize = useCallback(() => {
    api.set({
      x: 20,
      y: 20,
      width: 100,
      height: 100,
    });
  }, []);

  return (
    <div className={s.testWrap} ref={containerRef}>
      <ProductUiControls
        center={handleCenter}
        vertical={handleVertical}
        horizontal={handleHorizontal}
      />
      <animated.div
        className={s.test}
        style={{ x, y, width, height }}
        {...bind()}
      >
        Test
        <div className={s.resizer}></div>
      </animated.div>
    </div>
  );
};

export default Test;
