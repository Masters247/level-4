/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import ImageUploader from "../ImageUploader/ImageUploader";
import ProductUiPanel from "../ProductUi/ProductUiPanel";
import s from "./productView.module.scss";
import cn from "classnames";

const ProductView = ({
  products,
  image,
  productColoutVariants,
  handleColourClick,
  handleScreenShot,
  handleSaveCustomImage,
  control,
  setControl,
  saved,
}: any) => {
  // gets ratio of image - used to constrain resizer to the ratio of image
  const [ratio, setRatio]: any = useState();
  const [undoActive, setUndoActive] = useState(false);
  const [redoActive, setRedoActive] = useState(false);
  const [actionsArr, setActionsArr]: any = useState([]);
  // count keeps track of actionsArr
  const [count, setCount] = useState(0);
  const [logo, setLogo] = useState(null);
  // if true image uploader shows in ui
  const [imageUpload, setImageUpload] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragEl = useRef<HTMLDivElement | null>(null);
  const logoBox = useRef<HTMLDivElement | null>(null);

  const [imageWidth, setImageWidth] = useState(80);
  const [imageHeight, setImageHeight] = useState(80);

  const [{ x, y, width, height }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    width: imageWidth,
    height: imageHeight,
  }));

  useEffect(() => {
    setRatio(imageHeight / imageWidth);
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
      setActionsArr((actionsArr: any) => [
        ...actionsArr,
        {
          x: 0,
          y: 0,
          width: width.get(),
          height: height.get(),
        },
      ]);
    }
  }, [imageHeight, imageWidth, logo]);

  useEffect(() => {
    if (count === 0) {
      setUndoActive(false);
    }
    if (actionsArr.length - 1 === count) {
      setRedoActive(false);
    }
  }, [count, actionsArr]);

  const bind =
    // if no logo do not drag
    logo !== null
      ? useDrag(
          (state: any) => {
            (window as any).movement = state.movement;
            (window as any).offset = state.offset;

            const isResizing = state?.event.target === dragEl.current;
            const isDragging = state.active;

            if (isResizing) {
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
              const containerWidth: any =
                containerRef.current?.clientWidth ?? 0;
              const containerHeight: any =
                containerRef.current?.clientHeight ?? 0;
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
        )
      : // disables drag component if no logo
        useDrag(() => {});

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
          setImageWidth={setImageWidth}
          setImageHeight={setImageHeight}
          actionsArr={actionsArr}
          setActionsArr={setActionsArr}
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
              ref={containerRef}>
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
                ref={logoBox}>
                <div className={s.imageOuterWrap}>
                  {logo !== null && (
                    <div className={s.logoImageWrap}>
                      <img alt="logo" className={s.logoImage} src={logo} />
                    </div>
                  )}
                </div>
                <div
                  className={cn(s.resizer, logo === null && s.resizerDisabled)}
                  ref={dragEl}></div>
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
        saved={saved}
        actionsTaken={logo}
      />
    </div>
  );
};

export default ProductView;
