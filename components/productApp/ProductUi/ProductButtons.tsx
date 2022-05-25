import s from "./productButtons.module.scss";
import Undo from "../../ui/icons/Undo";
import Redo from "../../ui/icons/Redo";
import cn from "classnames";
import Save from "../../ui/icons/Save";
import Tick from "../../ui/icons/Tick";
import Download from "../../ui/icons/Download";
import { useSession } from "next-auth/react";
import ProductButton from "./ProductButton";

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
}: any) => {
  const { data: session }: any = useSession();

  return (
    <div className={cn(s.uiButtons)}>
      <ProductButton
        className={s.newLogoButton}
        variant="primary"
        onClick={handleImageUpload}
      >
        {!stateUploader ? <>Close Image Uploader</> : <>New Logo</>}
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
        undo={true}
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
        disabled={!session}
        onClick={handleSaveCustomImage}
      >
        {saved === 0 && "save"}
        {saved === 1 && "saving"}
        {saved === 2 && "saved"}
      </ProductButton>
      <ProductButton
        download={true}
        variant="secondary"
        onClick={handleScreenShot}
      >
        download
      </ProductButton>
    </div>
  );
};

export default ProductButtons;
