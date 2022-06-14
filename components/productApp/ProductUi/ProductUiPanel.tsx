import s from "./productUiPanel.module.scss";
import cn from "classnames";
import Center from "../../ui/icons/Center";
import HorizontalAlign from "../../ui/icons/HorizontalAlign";
import VerticalAlign from "../../ui/icons/VerticalAlign";
import ProductButtons from "./ProductButtons";
import ProductColourButtons from "../ProductColourButtons/ProductColourButtons";
import { useStore } from "../store";

const ProductUiPanel = ({
  actionsTaken, // STORE DIFFICULT
  handleSaveCustomImage, //  STORE DIFF

  products, // OK FOR NOW !!

  center, // OK
  horizontal, // OK
  vertical, // OK

  handleRedo, // STORE - not used in this component

  handleScreenShot, // STORE
  handleUndo, // STORE
  redoActive, // STORE
  undoActive, // STORE
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
                {cont.icon}
              </button>
            );
          })}
        </div>
      </div>
      <div className={s.productColourWrap}>
        <h2>Colour:</h2>
        <ProductColourButtons products={products} position={s.position} />
      </div>
      <div className={s.embelishment}>
        <h2>Embelishment:</h2>
        <p>{store.productEmbelishment}</p>
      </div>
      <ProductButtons
        actionsTaken={actionsTaken} // STORE DIFFICULT
        handleScreenShot={handleScreenShot} // STORE
        handleSaveCustomImage={handleSaveCustomImage} // STORE
        handleRedo={handleRedo} // STORE
        handleUndo={handleUndo} // STORE
        redoActive={redoActive} // STORE
        undoActive={undoActive} // STORE
      />
    </div>
  );
};

export default ProductUiPanel;
