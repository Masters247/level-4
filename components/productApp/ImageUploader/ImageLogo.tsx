import s from "./imageLogo.module.scss";
import cn from "classnames";
import Remove from "../../ui/icons/Remove";
import { useEffect, useState } from "react";
const ImageLogo = ({
  isLocal,
  index,
  imageList,
  handleLogoPick,
  onImageRemove,
  image,
  setSelectImage,
  selectImage,
  setArraySelect,
  arraySelect,
  onImageLocalRemove,
}: any) => {
  useEffect(() => {
    console.log("is array local", isLocal);
  }, []);

  const handleSelected = (index: any) => {
    setSelectImage(index);
  };

  return (
    <div
      className={cn(s.imageItem, selectImage === index && s.picked)}
      onClick={() => handleSelected(index)}>
      <button
        type="button"
        onClick={() => handleLogoPick(imageList, index)}
        className={s.handleLogoPickButton}
        style={{ height: "100%", width: "100%" }}>
        <img src={image.data_url} alt="uploaded logo" />
      </button>
      {isLocal ? (
        <button
          className={s.imageCloseBtn}
          type="button"
          onClick={() => onImageLocalRemove(index)}>
          <Remove styles={s.remove} />
        </button>
      ) : (
        <button
          className={s.imageCloseBtn}
          type="button"
          onClick={() => onImageRemove(index)}>
          <Remove styles={s.remove} />
        </button>
      )}
    </div>
  );
};

export default ImageLogo;
