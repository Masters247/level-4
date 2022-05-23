/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import ImageUploader from "../ImageUploader/ImageUploader";
import ProductUiPanel from "../ProductUi/ProductUiPanel";
import s from "./productView.module.scss";
import { copyFile } from "fs";

const ProductView = ({
  products,
  image,
  productColoutVariants,
  handleColourClick,
  handleScreenShot,
  handleSaveCustomImage,
  control,
  setControl,
  id,
}: any) => {
  const [count, setCount]: any = useState(0);
  const [imageWidth, setImageWidth]: any = useState(80);
  const [imageHeight, setImageHeight]: any = useState(80);
  const [undoActive, setUndoActive]: any = useState(false);
  const [redoActive, setRedoActive]: any = useState(false);
  const [actionsArr, setActionsArr]: any = useState([
    { x: 0, y: 0, width: imageWidth, height: imageHeight },
  ]);

  const [{ x, y, width, height }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    width: imageWidth,
    height: imageHeight,
  }));

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragEl = useRef<HTMLDivElement | null>(null);
  const logoBox = useRef<HTMLDivElement | null>(null);

  const bind = useDrag(
    (state: any) => {
      (window as any).movement = state.movement;
      (window as any).offset = state.offset;

      const isResizing = state?.event.target === dragEl.current;
      const isDragging = state.active;

      /* need to get aspect ration of image data */
      /* and the math to work out the difference
      
      E.g height = width: state.offset * 0.4
      */

      if (isResizing) {
        api.set({
          width: state.offset[0],
          height: state.offset[1],
        });
      } else {
        api.set({
          x: state.offset[0],
          y: state.offset[1],
        });
      }

      if (!isDragging) {
        setActionsArr((actionsArr: any) => [
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

  useEffect(() => {
    console.log(width.get());
    console.log(height.get());
    console.log("image wh state", imageHeight, imageWidth);
    if (count === 0) {
      setUndoActive(false);
    }
    if (actionsArr.length - 1 === count) {
      setRedoActive(false);
    }
  }, [count, actionsArr, imageHeight, imageWidth]);

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

    setActionsArr((actionsArr: any) => [
      ...actionsArr,
      {
        x: actionsArr[count - 1].x,
        y: actionsArr[count - 1].y,
        width: actionsArr[count - 1].width,
        height: actionsArr[count - 1].height,
      },
    ]);
    setCount(count - 1);
  };

  const handleCenter = () => {
    const getWidth = width.get() / 2;
    const getHeight = height.get() / 2;
    const containerWidth: any = containerRef.current?.clientWidth;
    const containerHeight: any = containerRef.current?.clientHeight;
    api.set({
      x: containerWidth / 2 - getWidth,
      y: containerHeight / 2 - getHeight,
    });
    setActionsArr((actionsArr: any) => [
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
    const getHeight = height.get() / 2;
    const containerHeight: any = containerRef.current?.clientHeight;
    api.set({
      y: containerHeight / 2 - getHeight,
    });

    const arrayLength = actionsArr.length - 1;
    const prevArrayYValue = actionsArr[arrayLength].x;

    setActionsArr((actionsArr: any) => [
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
    const getWidth = width.get() / 2;
    const containerWidth: any = containerRef.current?.clientWidth;
    api.set({
      x: containerWidth / 2 - getWidth,
    });

    const arrayLength = actionsArr.length - 1;
    const prevArrayYValue = actionsArr[arrayLength].y;

    setActionsArr((actionsArr: any) => [
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

  const handleControls = () => {
    setControl(!control);
  };

  const [logo, setLogo]: any = useState(null);
  const [imageUpload, setImageUpload]: any = useState(true);

  const handleImageUpload = () => {
    setImageUpload(!imageUpload);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={s.appWrap}>
      {!imageUpload && (
        <ImageUploader
          setLogo={setLogo}
          handleImageUpload={handleImageUpload}
          logo={logo}
          setImageWidth={setImageWidth}
          setImageHeight={setImageHeight}
        />
      )}

      <div className={s.productViewportContainer}>
        <div id="capture" className={s.imageCaptureWrap}>
          <div className={s.imageWrap}>
            <img src={image.url} width="500px" height="500px" alt="product" />
          </div>
          <div className={s.productViewport}>
            <div
              className={`${control ? s.customArear : s.customArearHide}`}
              ref={containerRef}
            >
              <animated.div
                className={s.customLogo}
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
                      <img
                        alt="logo"
                        className={s.logoImage}
                        src={logo}
                        // width={imageWidth}
                        // height={imageHeight}
                        // style={{
                        //   maxWidth: `${imageWidth}`,
                        //   maxHeight: `${imageHeight}`,
                        // }}
                      />
                    </div>
                  )}
                </div>
                <div className={s.resizer} ref={dragEl}></div>
              </animated.div>
            </div>
          </div>
        </div>
      </div>
      <ProductUiPanel
        products={products}
        productColoutVariants={productColoutVariants}
        center={handleCenter}
        vertical={handleVertical}
        horizontal={handleHorizontal}
        showhide={handleControls}
        state={control}
        handleSaveCustomImage={handleSaveCustomImage}
        handleColourClick={handleColourClick}
        handleScreenShot={handleScreenShot}
        handleImageUpload={handleImageUpload}
        stateUploader={imageUpload}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        undoActive={undoActive}
        redoActive={redoActive}
      />
    </div>
  );
};

export default ProductView;
