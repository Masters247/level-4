/* eslint-disable @next/next/no-img-element */
import s from "./imageLogo.module.scss";
import cn from "classnames";
import Remove from "../../ui/icons/Remove";
import { useEffect, useState, useRef } from "react";
const ImageLogo = ({
  isLocal,
  index,
  imageList,
  handleLogoPick,
  onImageRemove,
  image,
  setSelectImage,
  selectImage,
  onImageLocalRemove,
}: any) => {
  const [isSelected, setIsSelected] = useState(false);
  const selectedLogo = window.localStorage.getItem("selected-logo");

  // useEffect(() => {
  //   setSelectImage(selectedLogo);
  //   setIsSelected(true);
  // }, [isSelected]);

  // console.log("file: ImageLogo.tsx ~ line 20 ~ selectedLogo", selectedLogo);
  // let locallyStoredLogos: any = window.localStorage.getItem("logo list");

  const handleSelected = (index: any) => {
    setIsSelected(true);

    setSelectImage(index);

    // setIsSelected(true);
    // setSelectImage(index);
    window.localStorage.setItem("selected-logo", index);
  };

  return (
    <div
      className={cn(
        s.imageItem,
        selectImage === index && isSelected && s.picked
      )}
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
