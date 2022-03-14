import s from "./productButtons.module.scss";
import Undo from "../../ui/icons/Undo";
import Redo from "../../ui/icons/Redo";
// import Show from "../../ui/icons/Show";
// import Hide from "../../ui/icons/Hide";
import Save from "../../ui/icons/Save";
import Download from "../../ui/icons/Download";

const buttons = [
  // { icon: "", class: s.resize, text: "resize" },
  { icon: "", class: s.image, text: "new image" },
  { icon: <Undo styles={s.undo} />, class: s.undoWrap, text: "undo" },
  { icon: <Redo styles={s.redo} />, class: s.redoWrap, text: "redo" },
  {
    icon: <Save styles={s.saveIcon} />,
    class: s.save,
    text: "save",
  },
  {
    icon: <Download styles={s.downloadIcon} />,
    class: s.download,
    text: "download",
  },
];

const ProductButtons = ({ state }: any) => {
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
          <button key={i} className={`${s.uiButton} ${button.class} `}>
            {button.icon}
            <p>{button.text}</p>
          </button>
        );
      })}
    </div>
  );
};

export default ProductButtons;
