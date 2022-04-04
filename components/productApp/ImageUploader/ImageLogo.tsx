import s from "./imageLogo.module.scss";
import cn from "classnames";
import Remove from "../../ui/icons/Remove";
import { useState } from "react";
const ImageLogo = ({
  index,
  imageList,
  handleLogoPick,
  onImageRemove,
  image,
  setSelectImage,
  selectImage,
}: any) => {
  const handleSelected = (index: any) => {
    setSelectImage(index);
    console.log("handle selected clicked");
  };
  const handleRemove = (index: any) => {
    console.log("handle remove clicked");
  };

  /* 
THIS IS AN ISSUE WITH IMAGE DATA
*/

  return (
    <div
      className={cn(s.imageItem, selectImage === index && s.picked)}
      onClick={() => handleSelected(index)}>
      <button
        className={s.handleRemoveButton}
        type="button"
        onClick={() => handleRemove}>
        <Remove styles={s.remove} />
      </button>
      <button
        type="button"
        onClick={() => handleLogoPick(imageList, index)}
        className={s.handleLogoPickButton}
        style={{ height: "100%", width: "100%" }}>
        {/* <img src={image.data_url} alt="uploaded logo" /> */}
      </button>

      {/* <button
        className={s.imageCloseBtn}
        type="button"
        onClick={() => onImageRemove(index)}>
        <Remove styles={s.remove} />
      </button> */}
    </div>
  );
};

export default ImageLogo;
