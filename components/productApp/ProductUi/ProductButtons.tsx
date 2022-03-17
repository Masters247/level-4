import s from "./productButtons.module.scss";
import Undo from "../../ui/icons/Undo";
import Redo from "../../ui/icons/Redo";
// import Show from "../../ui/icons/Show";
// import Hide from "../../ui/icons/Hide";
import Save from "../../ui/icons/Save";
import Download from "../../ui/icons/Download";
import { useEffect } from "react";

const ProductButtons = ({ state, handleScreenShot }: any) => {
  const buttons = [
    // { icon: "", class: s.resize, text: "resize" },
    { icon: "", class: s.image, text: "new image", function: handleScreenShot },
    {
      icon: <Undo styles={s.undo} />,
      class: s.undoWrap,
      text: "undo",
      // function: "",
    },
    {
      icon: <Redo styles={s.redo} />,
      class: s.redoWrap,
      text: "redo",
      // function: "",
    },
    {
      icon: <Save styles={s.saveIcon} />,
      class: s.save,
      text: "save",
      // function: "",
    },
    {
      icon: <Download styles={s.downloadIcon} />,
      class: s.download,
      text: "download",
      function: handleScreenShot,
    },
  ];
  const uiButtons = state ? buttons : buttons.slice(3, 5);

  return (
    <div
      className={s.uiButtonsWrap}
      style={{
        paddingTop: state ? "1em" : "0em",
      }}
    >
      {uiButtons.map((button: any, i: any) => {
        return (
          <>
            {(state && button.text === "download") ||
            (state && button.text === "save") ? (
              <button
                id={button.text}
                key={i}
                className={`${s.uiButton} ${button.class} ${s.disabled}`}
                onClick={button?.function}
                disabled
              >
                {button.icon}
                <p>{button.text}</p>
              </button>
            ) : (
              <button
                id={button.text}
                key={i}
                className={`${s.uiButton} ${button.class} `}
                onClick={button?.function}
              >
                {button.icon}
                <p>{button.text}</p>
              </button>
            )}
          </>
        );
      })}
    </div>
  );
};

export default ProductButtons;
