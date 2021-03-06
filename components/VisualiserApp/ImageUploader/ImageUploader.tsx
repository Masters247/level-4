import { useEffect, useState } from "react";
import cn from "classnames";
import React from "react";
import s from "./imageUploader.module.scss";
import Remove from "../../ui/icons/Remove";
import ImageUploading from "react-images-uploading";
import ImageLogo from "./ImageLogo";
import ProductButton from "../Button/ControlButton";
import { useStore } from "../store";

const ImageUploader = ({
  setLogo,
  setImageWidth,
  setImageHeight,
  reset,
}: any) => {
  const [localImages, setLocalImages]: any = useState([]);
  const [images, setImages] = useState([]);
  const [selectImage, setSelectImage] = useState(0);
  const maxNumber = 10;
  const store = useStore();

  const onChange = (imageList: any) => {
    reset();
    setImages(imageList);

    if (imageList.length !== 0) {
      setLogo(imageList[0].data_url);

      const newImage = new Image();
      newImage.src = imageList[0].data_url;

      const imgWidth = newImage.naturalWidth;
      const imgHeight = newImage.naturalHeight;

      setImageWidth(imgWidth);
      setImageHeight(imgHeight);
    } else {
      setLogo(null);
    }

    window.localStorage.setItem("logo list", JSON.stringify(imageList));
  };

  const handleLogoPick = (imageList: any, index: number) => {
    reset();
    setLogo(imageList[index].data_url);

    const newImage = new Image();
    newImage.src = imageList[index].data_url;

    const imgWidth = newImage.naturalWidth;
    const imgHeight = newImage.naturalHeight;

    setImageWidth(imgWidth);
    setImageHeight(imgHeight);
  };

  useEffect(() => {
    let local: any = window.localStorage.getItem("logo list");
    let obj = JSON.parse(local);

    if (obj === null) {
      return;
    } else if (localImages?.length === 0) {
      setImages(obj);
    } else {
      setImages(localImages?.concat(obj));
    }
  }, [localImages]);

  return (
    <div className={s.imageUploaderWrap}>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["png", "jpeg", "jpg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageRemove,
          dragProps,
        }) => (
          <div className={s.uploadImageWrap}>
            <div className={s.imageButtonWrap}>
              <ProductButton
                variant="primary-dashed"
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop
              </ProductButton>
              <ProductButton
                variant="tertiary-b"
                onClick={() => {
                  onImageRemoveAll();
                  window.localStorage.removeItem("selected-logo");
                }}
              >
                Remove all
              </ProductButton>
              <ProductButton
                variant="primary-b"
                onClick={() => store.setImageUploader(false)}
              >
                <Remove styles={s.remove} />
              </ProductButton>
            </div>
            <div
              className={cn(
                s.newImageWrap,
                imageList.length !== 0 && s.newImageWrapPaddingTop
              )}
            >
              {imageList?.map((image: any, index: number) => {
                return (
                  <div key={index}>
                    {image !== null && (
                      <ImageLogo
                        alt="uploaded logo"
                        index={index}
                        imageList={imageList.concat(localImages)}
                        handleLogoPick={handleLogoPick}
                        onImageRemove={onImageRemove}
                        image={image}
                        setSelectImage={setSelectImage}
                        selectImage={selectImage}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;
