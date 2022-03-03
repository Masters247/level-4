import { useCallback, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useLockBodyScroll } from "react-use";
import ProductUiPanel from "../ProductUi/ProductUiPanel";
import s from "./productView.module.scss";

const ProductView = () => {
  const [{ x, y, width, height }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    width: 80,
    height: 80,
  }));

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragEl = useRef<HTMLDivElement | null>(null);

  useLockBodyScroll();

  const bind = useDrag(
    (state) => {
      const isResizing = state?.event.target === dragEl.current;
      useLockBodyScroll();
      if (isResizing) {
        api.set({
          width: state.offset[0],
          height: state.offset[0],
        });
      } else {
        api.set({
          x: state.offset[0],
          y: state.offset[1],
        });
      }
    },
    {
      from: (event) => {
        const isResizing = event.target === dragEl.current;
        if (isResizing) {
          return [width.get(), height.get()];
        } else {
          return [x.get(), y.get()];
        }
      },
      bounds: (state) => {
        const isResizing = state?.event.target === dragEl.current;
        const containerWidth: any = containerRef.current?.clientWidth ?? 0;
        const containerHeight: any = containerRef.current?.clientHeight ?? 0;
        if (isResizing) {
          return {
            top: 50,
            left: 50,
            right: containerWidth - x.get(),
            bottom: containerHeight - y.get(),
          };
        } else {
          return {
            top: 0,
            left: 0,
            right: containerWidth - width.get(),
            bottom: containerHeight - height.get(),
          };
        }
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

  return (
    <div className={s.productViewWrap}>
      <div className={s.viewportWrap} ref={containerRef}>
        <animated.div
          className={s.viewport}
          style={{ x, y, width, height }}
          {...bind()}
        >
          <div className={s.resizer} ref={dragEl}></div>
        </animated.div>
      </div>
      <ProductUiPanel
        center={handleCenter}
        vertical={handleVertical}
        horizontal={handleHorizontal}
      />
    </div>
  );
};

export default ProductView;
