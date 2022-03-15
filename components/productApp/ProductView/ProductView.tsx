import { useCallback, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";
import { useDrag } from "@use-gesture/react";
import { useLockBodyScroll } from "react-use";
import ProductUiPanel from "../ProductUi/ProductUiPanel";
import s from "./productView.module.scss";

const ProductView = ({
  image,
  productColoutVariants,
  handleColourClick,
  handleScreenShot,
  id,
}: any) => {
  const [control, setControl] = useState(true);

  const [{ x, y, width, height }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    width: 80,
    height: 80,
  }));

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragEl = useRef<HTMLDivElement | null>(null);

  const bind = useDrag(
    (state) => {
      (window as any).movement = state.movement;
      (window as any).offset = state.offset;
      const isResizing = state?.event.target === dragEl.current;
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

  const handleControls = () => {
    setControl(!control);
  };

  return (
    <div className={s.appWrap}>
      <div className={s.productViewWrap} id="customView">
        <div className={s.imageWrap}>
          <Image
            src={image.url}
            priority
            layout="fixed"
            width={500}
            height={500}
            placeholder="blur"
            blurDataURL={image.url}
          />
        </div>
        <div className={s.productView}>
          <div
            className={`${control ? s.viewportWrap : s.viewPortClear}`}
            ref={containerRef}
          >
            <animated.div
              className={s.viewport}
              style={{ x, y, width, height, zIndex: "1" }}
              {...bind()}
            >
              <div
                className="imageWrap"
                style={{
                  width: "100%",
                  height: "100%",
                  zIndex: "-10",
                  pointerEvents: "none",
                }}
              >
                <Image
                  src="/squareLogo.png"
                  width={300}
                  height={300}
                  layout="responsive"
                />
              </div>
              <div className={s.resizer} ref={dragEl}></div>
            </animated.div>
          </div>
        </div>
      </div>
      <ProductUiPanel
        productColoutVariants={productColoutVariants}
        center={handleCenter}
        vertical={handleVertical}
        horizontal={handleHorizontal}
        showhide={handleControls}
        state={control}
        handleColourClick={handleColourClick}
        handleScreenShot={handleScreenShot}
      />
    </div>
  );
};

export default ProductView;
