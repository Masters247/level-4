import s from "./controlPanel.module.scss";
import cn from "classnames";
import Center from "../../ui/icons/Center";
import HorizontalAlign from "../../ui/icons/HorizontalAlign";
import VerticalAlign from "../../ui/icons/VerticalAlign";
import VisualiserButtons from "../VisualiserButtons/VisualiserButtons";
import ProductColourButtons from "../ProductColourButtons/ProductColourButtons";
import { useStore } from "../store";

const ControlPanel = ({
  actionsTaken, // STORE OR REFACT
  products, // STORE

  center, // OK
  horizontal, // OK
  vertical, // OK

  handleRedo, // STORE OR REFACT
  handleUndo, // STORE OR REFACT
  redoActive, // STORE OR REFACT
  undoActive, // STORE OR REFACT
  handleColourClick,
}: any) => {
  const controler = [
    {
      name: "center",
      icon: <Center styles={s.center} />,
      function: center,
    },
    {
      name: "center vertical",
      icon: <VerticalAlign styles={s.centerVertical} />,
      function: vertical,
    },
    {
      name: "center horizontal",
      icon: <HorizontalAlign styles={s.centerHorizontal} />,
      function: horizontal,
    },
  ];

  const controlStyles = cn(
    s.control,
    actionsTaken === null && s.controlDisabled
  );
  const store = useStore();

  return (
    <div className={cn(s.productUiWrap)}>
      <h1>{store.productName}</h1>
      <div className={s.uiControlsWrap}>
        <h2>Controls:</h2>
        <div className={s.controlsWrap}>
          {controler.map((cont: any) => {
            return (
              <button
                key={cont.name}
                onClick={cont?.function}
                className={controlStyles}
                disabled={actionsTaken === null}
              >
                <span className={s.iconWrap}>{cont.icon}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className={s.productColourWrap}>
        <h2>Colour:</h2>
        <ProductColourButtons
          products={products}
          position={s.position}
          handleColourClick={handleColourClick}
        />
      </div>
      <div className={s.embelishment}>
        <h2>Embelishment:</h2>
        <p>{store.productEmbelishment.replace("_", " / ")}</p>
      </div>
      <VisualiserButtons
        actionsTaken={actionsTaken} // STORE OR REFACT
        handleRedo={handleRedo} // STORE OR REFACT
        handleUndo={handleUndo} // STORE OR REFACT
        redoActive={redoActive} // STORE OR REFACT
        undoActive={undoActive} // STORE OR REFACT
      />
    </div>
  );
};

export default ControlPanel;
