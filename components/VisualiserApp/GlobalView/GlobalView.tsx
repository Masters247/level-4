/* eslint-disable @next/next/no-img-element */
import { FC, useRef, useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Action, useDrag } from "@use-gesture/react";
import ImageUploader from "../ImageUploader/ImageUploader";
import ControlPanel from "../ControlPanel/ControlPanel";
import s from "./globalView.module.scss";
import cn from "classnames";
import { useStore } from "../store";
import {
  Product,
  BasicImage,
  handleColourClick,
  ActionsObject,
} from "../types";

interface Props {
  image: BasicImage;
  products: Product;
  handleColourClick: handleColourClick;
}

const ProductView: FC<Props> = ({ image, products, handleColourClick }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragEl = useRef<HTMLDivElement | null>(null);
  const logoBox = useRef<HTMLDivElement | null>(null);

  const containerWidth = containerRef.current?.clientWidth ?? 0;
  const containerHeight = containerRef.current?.clientHeight ?? 0;

  // gets ratio of image - used to constrain resizer to the ratio of image
  const [ratio, setRatio] = useState<number>();
  const [undoActive, setUndoActive] = useState(false);
  const [redoActive, setRedoActive] = useState(false);
  const store = useStore();
  const [count, setCount] = useState(0);

  // is there a logo
  const [logo, setLogo] = useState(null);
  const [imageWidth, setImageWidth] = useState(80);
  const [imageHeight, setImageHeight] = useState(80);
  const [actionsArr, setActionsArr] = useState<Array<ActionsObject>>([]);

  const [{ x, y, width, height }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    width: imageWidth,
    height: imageHeight,
  }));

  const getWidth = width.get() / 2;
  const getHeight = height.get() / 2;

  useEffect(() => {
    const ratioCalculated = imageHeight / imageWidth;
    setRatio(ratioCalculated);
    if (imageWidth > 250) {
      api.set({
        width: imageWidth / 10,
        height: imageHeight / 10,
      });
    } else {
      api.set({
        width: imageWidth,
        height: imageHeight,
      });
    }

    // this sets initial array item in actionsArr
    if (count === 0 && logo === null) {
      return;
    } else {
      setActionsArr((actionsArr) => [
        ...actionsArr,
        {
          x: 0,
          y: 0,
          width: width.get(),
          height: height.get(),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageHeight, imageWidth, logo]);

  useEffect(() => {
    if (count === 0) {
      setUndoActive(false);
    }
    if (actionsArr.length - 1 === count) {
      setRedoActive(false);
    }
  }, [count, actionsArr]);

  const bind = useDrag(
    (state) => {
      const isResizing = state?.event.target === dragEl.current;
      const isDragging = state.active;

      if (isResizing && ratio !== undefined) {
        api.set({
          width: state.offset[0],
          height: state.offset[0] * ratio,
        });
      } else {
        api.set({
          x: state.offset[0],
          y: state.offset[1],
        });
      }

      if (!isDragging) {
        setActionsArr((actionsArr) => [
          ...actionsArr,
          {
            x: x.get(),
            y: y.get(),
            width: width.get(),
            height: height.get(),
          },
        ]);
        setCount(actionsArr.length);
        setUndoActive(true);
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

  const handleRedo = () => {
    setUndoActive(true);

    api.set({
      x: actionsArr[count + 1].x,
      y: actionsArr[count + 1].y,
      width: actionsArr[count + 1].width,
      height: actionsArr[count + 1].height,
    });

    setCount(count + 1);
  };

  const handleUndo = () => {
    setRedoActive(true);

    api.set({
      x: actionsArr[count - 1].x,
      y: actionsArr[count - 1].y,
      width: actionsArr[count - 1].width,
      height: actionsArr[count - 1].height,
    });

    setCount(count - 1);
  };

  const handleCenter = () => {
    api.set({
      x: containerWidth / 2 - getWidth,
      y: containerHeight / 2 - getHeight,
    });

    setActionsArr((actionsArr) => [
      ...actionsArr,
      {
        x: containerWidth / 2 - getWidth,
        y: containerHeight / 2 - getHeight,
        width: logoBox.current?.clientWidth,
        height: logoBox.current?.clientHeight,
      },
    ]);

    setUndoActive(true);
    setCount(count + 1);
  };

  const handleVertical = () => {
    api.set({
      y: containerHeight / 2 - getHeight,
    });

    const arrayLength = actionsArr.length - 1;
    const prevArrayYValue = actionsArr[arrayLength].x;

    setActionsArr((actionsArr) => [
      ...actionsArr,
      {
        x: prevArrayYValue,
        y: containerHeight / 2 - getHeight,
        width: logoBox.current?.clientWidth,
        height: logoBox.current?.clientHeight,
      },
    ]);

    setUndoActive(true);
    setCount(count + 1);
  };

  const handleHorizontal = () => {
    api.set({
      x: containerWidth / 2 - getWidth,
    });

    const arrayLength = actionsArr.length - 1;
    const prevArrayYValue = actionsArr[arrayLength].y;

    setActionsArr((actionsArr) => [
      ...actionsArr,
      {
        x: containerWidth / 2 - getWidth,
        y: prevArrayYValue,
        width: logoBox.current?.clientWidth,
        height: logoBox.current?.clientHeight,
      },
    ]);

    setUndoActive(true);
    setCount(count + 1);
  };

  const reset = () => {
    setCount(0);
    setActionsArr([]);
    api.set({ x: 0, y: 0 });
  };

  return (
    <div className={s.appWrap}>
      <div
        className={s.productViewportContainer}
        onClick={() => store.setImageUploader(false)}
      >
        <div id="capture" className={s.imageCaptureWrap}>
          <div className={s.imageWrap}>
            <img src={image.url} width="450px" height="450px" alt="product" />
          </div>
          <div className={s.productViewport}>
            <div
              className={`${
                store.showHideDragResizeDiv ? s.customArear : s.customArearHide
              }`}
              ref={containerRef}
            >
              <animated.div
                className={cn(
                  s.customLogo,
                  logo === null && s.customLogoDisabled
                )}
                style={{
                  x,
                  y,
                  width,
                  height,
                  zIndex: "1",
                }}
                {...bind()}
                ref={logoBox}
              >
                <div className={s.imageOuterWrap}>
                  {logo !== null && (
                    <div className={s.logoImageWrap}>
                      <img alt="logo" className={s.logoImage} src={logo} />
                    </div>
                  )}
                </div>
                <div
                  className={cn(s.resizer, logo === null && s.resizerDisabled)}
                  ref={dragEl}
                ></div>
              </animated.div>
            </div>
          </div>
        </div>
      </div>

      {store.imageUploader && (
        <ImageUploader
          setLogo={setLogo} // STORE - related to actions taken
          setImageWidth={setImageWidth}
          setImageHeight={setImageHeight}
          reset={reset}
        />
      )}

      <ControlPanel
        actionsTaken={logo} // STORE DIFF
        products={products} // OK FOR NOW !!
        center={handleCenter} //  OK
        horizontal={handleHorizontal} // OK
        vertical={handleVertical} // OK
        handleRedo={handleRedo} // STORE
        handleUndo={handleUndo} // STORE
        redoActive={redoActive} // STORE
        undoActive={undoActive} // STORE
        handleColourClick={handleColourClick}
      />
    </div>
  );
};

export default ProductView;
