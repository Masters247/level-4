import { useEffect, useState } from "react";
import cn from "classnames";
import React from "react";
import s from "./imageUploader.module.scss";
import Add from "../../ui/icons/Add";
import Remove from "../../ui/icons/Remove";
import ImageUploading from "react-images-uploading";
import ImageLogo from "./ImageLogo";

const ImageUploader = ({ logo, setLogo, handleImageUpload }: any) => {
  const [images, setImages] = useState([]);
  const [selectImage, setSelectImage] = useState(0);
  const maxNumber = 20;

  const onChange = (imageList: any) => {
    setImages(imageList);
    if (imageList.length !== 0) {
      setLogo(imageList[0].data_url);
    } else {
      setLogo(null);
    }

    window.localStorage.setItem("logo list", JSON.stringify(imageList));
  };

  const handleLogoPick = (imageList: any, index: any) => {
    setLogo(imageList[index].data_url);
  };

  const [localImages, setLocalImages] = useState([]);

  useEffect(() => {
    let local: any = window.localStorage.getItem("logo list");
    let obj = JSON.parse(local);
    setLocalImages(obj);
  }, []);

  return (
    <div className={s.imageUploaderWrap}>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url">
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className={s.uploadImageWrap}>
            <button
              className={s.buttonCloseImageUpload}
              onClick={handleImageUpload}>
              <Remove styles={s.remove} />
            </button>
            <div className={s.imageButtonWrap}>
              <button
                type="button"
                className={s.uploadButton}
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}>
                <div className={s.buttonTextWrap}>
                  <p>Click or Drop here</p>
                </div>
                <Add styles={s.add} />
              </button>
              <button
                type="button"
                className={s.removeAllImagesButton}
                onClick={onImageRemoveAll}>
                <p>Remove all images</p>
              </button>
            </div>
            <div
              className={cn(
                s.newImageWrap,
                imageList.length > 0 && s.newImageWrapPaddingBottom
              )}>
              {imageList.concat(localImages).map((image, index) => (
                <ImageLogo
                  key={index}
                  index={index}
                  imageList={imageList.concat(localImages)}
                  handleLogoPick={handleLogoPick}
                  onImageRemove={onImageRemove}
                  image={image}
                  setSelectImage={setSelectImage}
                  selectImage={selectImage}
                />
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;
