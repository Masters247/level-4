/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";
import { useDrag } from "@use-gesture/react";
import ImageUploader from "../ImageUploader/ImageUploader";
import ImageConverter from "../ImageConverter/ImageConverter";
import ProductUiPanel from "../ProductUi/ProductUiPanel";
import s from "./productView.module.scss";

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
  const [movementsArray, setMovementsArray]: any = useState([
    { offset: 0, movement: 0 },
  ]);
  const [redo, setRedo]: any = useState([]);
  const [undo, setUndo]: any = useState([]);

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

      // console.log("state movement", state.offset);
      const isResizing = state?.event.target === dragEl.current;
      console.log("bind", isResizing);
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
        // console.log("from", isResizing);

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

        // console.log("bounds", isResizing);
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
            }}
          >
            <Image
              src={image.url}
              quality={100}
              priority
              layout="responsive"
              width={500}
              height={500}
              // placeholder="blur"
              // blurDataURL={image.url}
              alt="product"
            />
          </div>
          <div className={s.productViewport}>
            <div
              className={`${control ? s.customArear : s.customArearHide}`}
              ref={containerRef}
            >
              <animated.div
                className={s.customLogo}
                style={{ x, y, width, height, zIndex: "1" }}
                {...bind()}
              >
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
      />
    </div>
  );
};

export default ProductView;
