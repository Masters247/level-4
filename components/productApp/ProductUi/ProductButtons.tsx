import s from "./productButtons.module.scss";
import cn from "classnames";
import ProductButton from "./ProductButton";
import Spinner from "../../ui/icons/Spinner";
import { useState } from "react";

const ProductButtons = ({
  handleScreenShot,
  handleImageUpload,
  handleSaveCustomImage,
  stateUploader,
  handleUndo,
  handleRedo,
  undoActive,
  redoActive,
  saved,
  download,
  actionsTaken,
}: any) => {
  const [spinnerColourDownload, setSpinnerColourDownload] = useState("#ffffff");
  const [spinnerColourSave, setSpinnerColourSave] = useState("#ffffff");

  const handleMouseEnter = (i: string) => {
    if (i === "save") {
      setSpinnerColourSave("#909090");
    } else {
      setSpinnerColourDownload("#be9957");
    }
  };

  const handleMouseLeave = (i: string) => {
    if (i === "save") {
      setSpinnerColourSave("#ffffff");
    } else {
      setSpinnerColourDownload("#ffffff");
    }
  };

  return (
    <div className={cn(s.uiButtons)}>
      <ProductButton
        className={s.newLogoButton}
        variant="primary"
        onClick={handleImageUpload}
      >
        {!stateUploader ? <>Close Image Uploader</> : <>Add New Logo</>}
      </ProductButton>
      <ProductButton
        undo={true}
        variant="primary"
        disabled={!undoActive}
        onClick={handleUndo}
      >
        undo
      </ProductButton>
      <ProductButton
        redo={true}
        variant="primary"
        disabled={!redoActive}
        onClick={handleRedo}
      >
        redo
      </ProductButton>
      <ProductButton
        save={saved === 0 && true}
        tick={saved === 2 && true}
        variant="tertiary"
        disabled={!actionsTaken}
        onClick={handleSaveCustomImage}
        onMouseEnter={() => handleMouseEnter("save")}
        onMouseLeave={() => handleMouseLeave("save")}
      >
        {saved === 0 && "save"}
        {saved === 1 && <Spinner colour={spinnerColourSave} />}
        {saved === 2 && "saved"}
      </ProductButton>
      <ProductButton
        download={download === 0 && true}
        tick={download === 2 && true}
        variant="secondary"
        disabled={!actionsTaken}
        onClick={handleScreenShot}
        onMouseEnter={() => handleMouseEnter("download")}
        onMouseLeave={() => handleMouseLeave("download")}
      >
        {download === 0 && "download"}
        {download === 1 && <Spinner colour={spinnerColourDownload} />}
        {download === 2 && "downloaded"}
      </ProductButton>
    </div>
  );
};

export default ProductButtons;
