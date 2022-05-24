import s from "./productButtons.module.scss";
import Undo from "../../ui/icons/Undo";
import Redo from "../../ui/icons/Redo";
import cn from "classnames";
import Save from "../../ui/icons/Save";
import Download from "../../ui/icons/Download";
import { useSession } from "next-auth/react";

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
  if (session) {
    console.log("active session");
  }

  // console.log(session);
  return (
    <div className={cn(s.uiButtons)}>
      <button
        className={cn(s.uiButton, s.imageButton)}
        onClick={handleImageUpload}
      >
        {!stateUploader ? <p>Close Image Uploader</p> : <p>New Logo</p>}
      </button>
      <button
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
      </button>
      <button
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
      </button>
      <button
        className={cn(
          s.uiButton,
          s.saveButton,
          !session && s.saveButtonDisabled,
          saved && s.saved
        )}
        onClick={handleSaveCustomImage}
        // disabled={session}
      >
        {saved ? (
          <>
            <Save styles={s.savedIcon} />
            <p>saving</p>
          </>
        ) : (
          <>
            <Save styles={s.saveIcon} />
            <p>save</p>
          </>
        )}
        {/* <Save styles={s.saveIcon} />
        <p>save</p> */}
      </button>
      <button
        className={cn(s.uiButton, s.downloadButton)}
        onClick={handleScreenShot}
      >
        <Download styles={s.downloadIcon} />
        <p>download</p>
      </button>
    </div>
  );
};

export default ProductButtons;
