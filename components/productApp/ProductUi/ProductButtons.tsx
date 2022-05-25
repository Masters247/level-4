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
  state,
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
      {/* <button
        className={cn(s.uiButton, s.imageButton)}
        onClick={handleImageUpload}
      >
        {!stateUploader ? <p>Close Image Uploader</p> : <p>New Logo</p>}
      </button> */}
      {/* <button
        className={cn(
          s.uiButton,
          s.undoButton,
          !undoActive && s.undoButtonDisabled
        )}
        disabled={!undoActive}
        onClick={handleUndo}
      >
        <Undo styles={s.undoIcon} />
        <p>undo</p>
      </button> */}
      {/* <button
        className={cn(
          s.uiButton,
          s.redoButton,
          !redoActive && s.redoButtonDisabled
        )}
        disabled={!redoActive}
        onClick={handleRedo}
      >
        <p>redo</p>
        <Redo styles={s.redoIcon} />
      </button> */}
      <button
        className={cn(
          s.uiButton,
          s.saveButton,
          !session && s.saveButtonDisabled,
          saved === 1 && s.saving,
          saved === 2 && s.saving
        )}
        onClick={handleSaveCustomImage}
      >
        {saved === 1 ? (
          <>
            <Save styles={s.savingIcon} />
            <p>saving</p>
          </>
        ) : (
          <>
            {saved === 2 ? (
              <>
                <Tick styles={s.savedIcon} />
              </>
            ) : (
              <>
                <Save styles={s.saveIcon} />
                <p>save</p>
              </>
            )}
          </>
        )}
      </button>
      {/* <button
        className={cn(s.uiButton, s.downloadButton)}
        onClick={handleScreenShot}
      >
        <Download styles={s.downloadIcon} />
        <p>download</p>
      </button> */}
    </div>
  );
};

export default ProductButtons;
