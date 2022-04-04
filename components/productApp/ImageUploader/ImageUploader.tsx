import { useState } from "react";
import cn from "classnames";
import React from "react";
import s from "./imageUploader.module.scss";
import Add from "../../ui/icons/Add";
import Remove from "../../ui/icons/Remove";
import ImageUploading from "react-images-uploading";

const ImageUploader = ({ logo, setLogo, handleImageUpload }: any) => {
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList: any) => {
    setImages(imageList);
    if (imageList.length !== 0) {
      setLogo(imageList[0].data_url);
    } else {
      setLogo(null);
    }
  };

  const handleLogoPick = (imageList: any, index: any) => {
    setLogo(imageList[index].data_url);
  };

  console.log(logo);

  return (
    <div className={s.imageUploaderWrap}>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
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
              onClick={handleImageUpload}
            >
              <Remove styles={s.remove} />
            </button>
            <div className={s.imageButtonWrap}>
              <button
                type="button"
                className={s.uploadButton}
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <div className={s.buttonTextWrap}>
                  <p>Click or Drop here</p>
                </div>
                <Add styles={s.add} />
              </button>
              <button
                type="button"
                className={s.removeAllImagesButton}
                onClick={onImageRemoveAll}
              >
                <p>Remove all images</p>
              </button>
            </div>
            <div
              className={cn(
                s.newImageWrap,
                imageList.length > 0 && s.newImageWrapPaddingBottom
              )}
            >
              {imageList.map((image, index) => (
                <div key={`image-${index}`} className={s.imageItem}>
                  <button
                    onClick={() => handleLogoPick(imageList, index)}
                    className={cn(logo !== index && s.picked)}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <img src={image.data_url} alt="uploaded logo" />
                  </button>

                  <button
                    className={s.imageCloseBtn}
                    type="button"
                    onClick={() => onImageRemove(index)}
                  >
                    <Remove styles={s.remove} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;
