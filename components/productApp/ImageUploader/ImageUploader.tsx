import { useEffect, useState } from "react";
import cn from "classnames";
import React from "react";
import s from "./imageUploader.module.scss";
import Add from "../../ui/icons/Add";
import Remove from "../../ui/icons/Remove";
import ImageUploading from "react-images-uploading";
import ImageLogo from "./ImageLogo";

const ImageUploader = ({ logo, setLogo, handleImageUpload }: any) => {
  const [localImages, setLocalImages]: any = useState([]);
  const [images, setImages] = useState([]);
  const [selectImage, setSelectImage] = useState(0);
  const maxNumber = 10;

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
  }, []);

  const onImageLocalRemove = (index: any) => {
    let local: any = window.localStorage.getItem("logo list");
    let obj = JSON.parse(local);
    obj.splice(index, 1);
    window.localStorage.setItem("logo list", JSON.stringify(obj));
    setLocalImages(obj);
  };

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

            <div className={cn(s.newImageWrap)}>
              {imageList?.map((image: any, index: any) => {
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
                        isLocal={false}
                        onImageLocalRemove={onImageLocalRemove}
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
