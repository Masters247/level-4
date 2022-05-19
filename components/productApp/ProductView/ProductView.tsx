/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import ImageUploader from "../ImageUploader/ImageUploader";
import ImageConverter from "../ImageConverter/ImageConverter";
import ProductUiPanel from "../ProductUi/ProductUiPanel";
import s from "./productView.module.scss";

/* 

ARRAY OFFSETS IS UPDATED AND IMMUTABLE
--------------------------------------

NEED TO MAKE THE UNDO AND REDO BUTTONS ITERATE THROUGH HISTORY BY SELECTING ARRAY NUMBER 

ADDING OR SUBSTRACTING RSPECTIVELY

*/

const ProductView = ({
  products,
  image,
  productColoutVariants,
  handleColourClick,
  handleScreenShot,
  handleSaveCustomImage,
  saveCustomImage,
  control,
  setControl,
  id,
}: any) => {
  const [imageWidth, setImageWidth]: any = useState(80);
  const [imageHeight, setImageHeight]: any = useState(80);
  const xAxisState: any = [];
  const yAxisState: any = [];
  const positionOffset: any = [{ x: 0, y: 0 }];

  // UNDO REDO FUNCTIONALITY FOR DRAG & RESIZE

  /*
  FOR DRAG 
  
  1: GET INITIAL POSITION OF X & Y 
  1A: STORE IN ARRAY
  1B: Repeat:
  EI
  [
    {X: NUM, Y: NUM},
  ]

  2: GET END POSITION OF MOVEMENTT X & Y 
  2A: STORE IN ARRAY

  Note: WE DON'T NEED ALL THE MOVEMENTS JUST THE FIRST AND LAST. 
  THE LAST AND FIRST MOVEMENT NEED TO BE IMMUTABLE
  SO WE CAN REDO UNDO ALL STEPS FROM BEGINNING OF USE... 

  3: NEED TO COUNT THE AMOUNT OF MOVEMENTS/OFFSETS.
  
  4: FEED THAT COUNT INTO THE UNDO AND REDO functions.
  4A: BOTH BUTTONS INCREMENT THROUGH THE ARRAY ONE AT A TIME. 
  
  */

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
      // const xAxis = state.offset[0];
      // xAxisState.push(xAxis);

      // const yAxis = state.offset[1];
      // yAxisState.push(yAxis);

      // const xAxisStateEnd = xAxisState.length;
      // const yAxisStateEnd = yAxisState.length;

      // positionOffset.push({
      //   x: xAxisState[xAxisStateEnd - 1],
      //   y: yAxisState[yAxisStateEnd - 1],
      // });

      // console.log("is active", state.active);

      const isDragging = state.active;

      if (!isDragging) {
        positionOffset.push({ x: state.offset[0], y: state.offset[1] });
        console.log("last position", positionOffset);
      }

      // console.log("container ref", containerRef);
      // console.log("xAxis", xAxis, "yAxis", yAxis);
      // console.log("xState", xAxisState, "yState", yAxisState);
      // console.log("xLength", xAxisState.length, "yLength", yAxisState.length);
      // console.log(
      //   "x end =",
      //   xAxisState[xAxisStateEnd - 1],
      //   "y end =",
      //   yAxisState[yAxisStateEnd - 1]
      // );
      // console.log("offsets", positionOffset);
    },

    {
      // this tells use gesture where to set the initial movement from
      from: (event) => {
        const isResizing = event.target === dragEl.current;
        if (isResizing) {
          return [width.get(), height.get()];
        } else {
          return [x.get(), y.get()];
        }
      },
      //Limits the bounds of the movement of drag element
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

  const handleRedo = () => {
    const positionArrayLength = positionOffset.length;
    console.log("array length", positionArrayLength);

    api.set({
      x: 7.5016021728515625,
    });
  };
  const handleUndo = () => {
    const positionArrayLength = positionOffset.length - 1;

    // Iterate the array length by minus one to go back through offsets

    api.set({
      x: positionOffset[-positionArrayLength].x,
      y: positionOffset[-positionArrayLength].y,
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
        />
      )}
      <ImageConverter
        imageData={logo}
        setImageWidth={setImageWidth}
        setImageHeight={setImageHeight}
      />
      <div className={s.productViewportContainer}>
        <div id="capture" className={s.imageCaptureWrap}>
          <div
            className={s.imageWrap}
            style={{
              width: "500px",
              height: "500px",
            }}>
            <img
              src={image.url}
              width="500px"
              height="500px"
              style={{ width: "500px", height: "500px" }}
              alt="product"
            />
          </div>
          <div className={s.productViewport}>
            <div
              className={`${control ? s.customArear : s.customArearHide}`}
              ref={containerRef}>
              <animated.div
                className={s.customLogo}
                style={{ x, y, width, height, zIndex: "1" }}
                {...bind()}>
                <div className={s.imageOuterWrap}>
                  {logo !== null && (
                    <div className={s.logoImageWrap}>
                      <img
                        alt="logo"
                        className={s.logoImage}
                        src={logo}
                        style={{
                          maxWidth: `${imageWidth}`,
                          maxHeight: `${imageHeight}`,
                        }}
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
      />
    </div>
  );
};

export default ProductView;
