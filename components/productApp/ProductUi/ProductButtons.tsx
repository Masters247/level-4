import s from "./productButtons.module.scss";
import Undo from "../../ui/icons/Undo";
import Redo from "../../ui/icons/Redo";
import cn from "classnames";
import Save from "../../ui/icons/Save";
import Download from "../../ui/icons/Download";

const ProductButtons = ({ state, handleScreenShot }: any) => {
  return (
    <div className={cn(s.uiButtons, !state && s.uiButtonHidden)}>
      <button
        className={cn(s.uiButton, s.imageButton, !state && s.hide)}
        // onClick={handleScreenShot}
        disabled
      >
        <p>New Image</p>
      </button>
      <button
        className={cn(s.uiButton, s.undoButton, !state && s.hide)}
        // onClick={handleScreenShot}
        disabled
      >
        <Undo styles={s.undoIcon} />
        <p>undo</p>
      </button>
      <button
        className={cn(s.uiButton, s.redoButton, !state && s.hide)}
        // onClick={handleScreenShot}
        disabled
      >
        <p>redo</p>
        <Redo styles={s.redoIcon} />
      </button>
      <button
        className={cn(s.uiButton, s.saveButton, state && s.disabled)}
        // onClick={handleScreenShot}
        disabled
      >
        <Save styles={s.saveIcon} />
        <p>save</p>
      </button>
      <button
        className={cn(s.uiButton, s.downloadButton, state && s.disabled)}
        onClick={handleScreenShot}
        disabled={state}
      >
        <Download styles={s.downloadIcon} />
        <p>download</p>
      </button>
    </div>
  );
};

export default ProductButtons;
