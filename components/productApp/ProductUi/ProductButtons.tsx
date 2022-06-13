import s from "./productButtons.module.scss";
import cn from "classnames";
import { useSession } from "next-auth/react";
import ProductButton from "./ProductButton";
import Spinner from "../../ui/icons/Spinner";
import { useState } from "react";
import { useStore } from "../store";

const ProductButtons = ({
  actionsTaken, //  STORE DIFFICULT

  handleSaveCustomImage, // STORE
  handleScreenShot, // STORE
  handleRedo, // STORE
  handleUndo, // STORE
  redoActive, // STORE
  undoActive, // STORE
}: any) => {
  const store = useStore();
  const { data: session }: any = useSession();
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
        onClick={() => store.setImageUploader(!store.imageUploader)}>
        {store.imageUploader ? <>Close Image Uploader</> : <>Add New Logo</>}
      </ProductButton>
      <ProductButton
        undo={true}
        variant="primary"
        disabled={!undoActive}
        onClick={handleUndo}>
        undo
      </ProductButton>
      <ProductButton
        redo={true}
        variant="primary"
        disabled={!redoActive}
        onClick={handleRedo}>
        redo
      </ProductButton>
      <ProductButton
        save={store.saveCustomImage === 0 && true}
        tick={store.saveCustomImage === 2 && true}
        variant="tertiary"
        disabled={!session || !actionsTaken}
        onClick={handleSaveCustomImage}
        onMouseEnter={() => handleMouseEnter("save")}
        onMouseLeave={() => handleMouseLeave("save")}>
        {store.saveCustomImage === 0 && "save"}
        {store.saveCustomImage === 1 && <Spinner colour={spinnerColourSave} />}
        {store.saveCustomImage === 2 && "saved"}
      </ProductButton>
      <ProductButton
        download={store.downloadCustomImage === 0 && true}
        tick={store.downloadCustomImage === 2 && true}
        variant="secondary"
        disabled={!actionsTaken}
        onClick={handleScreenShot}
        onMouseEnter={() => handleMouseEnter("download")}
        onMouseLeave={() => handleMouseLeave("download")}>
        {store.downloadCustomImage === 0 && "download"}
        {store.downloadCustomImage === 1 && (
          <Spinner colour={spinnerColourDownload} />
        )}
        {store.downloadCustomImage === 2 && "downloaded"}
      </ProductButton>
    </div>
  );
};

export default ProductButtons;
