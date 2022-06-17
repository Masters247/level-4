import s from "./imageLogo.module.scss";
import cn from "classnames";
import Remove from "../../ui/icons/Remove";
import { useState, useEffect } from "react";

const ImageLogo = ({
  index,
  imageList,
  handleLogoPick,
  onImageRemove,
  image,
  setSelectImage,
  selectImage,
}: any) => {
  const [isSelected, setIsSelected] = useState(false);

  const selectedLogo: any = window.localStorage.getItem("selected-logo");
  const selectedLogoNumber = parseInt(selectedLogo);

  useEffect(() => {
    setSelectImage(selectedLogoNumber);
    setIsSelected(true);
  }, []);

  const handleSelected = (index: number) => {
    const indexToString = index.toString();
    setIsSelected(true);
    setSelectImage(index);
    window.localStorage.setItem("selected-logo", indexToString);
  };

  return (
    <div
      className={cn(
        s.imageItem,
        selectImage === index && isSelected && s.picked
      )}
      onClick={() => handleSelected(index)}
    >
      <button
        type="button"
        onClick={() => handleLogoPick(imageList, index)}
        className={s.handleLogoPickButton}
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
  );
};

export default ImageLogo;
