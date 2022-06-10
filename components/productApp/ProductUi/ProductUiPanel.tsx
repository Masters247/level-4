import s from "./productUiPanel.module.scss";
import cn from "classnames";
import Center from "../../ui/icons/Center";
import HorizontalAlign from "../../ui/icons/HorizontalAlign";
import VerticalAlign from "../../ui/icons/VerticalAlign";
import ProductButtons from "./ProductButtons";
import ProductColourButtons from "../ProductColourButtons/ProductColourButtons";
import { useStore } from "../stateProductApp/store";

const ProductUiPanel = ({
  products,
  center,
  vertical,
  horizontal,
  handleSaveCustomImage,
  handleImageUpload,
  handleScreenShot,
  stateUploader,
  handleUndo,
  handleRedo,
  undoActive,
  redoActive,
  actionsTaken,
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
      <h1>{products.name}</h1>
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
        stateUploader={stateUploader}
        handleImageUpload={handleImageUpload}
        handleScreenShot={handleScreenShot}
        handleSaveCustomImage={handleSaveCustomImage}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        undoActive={undoActive}
        redoActive={redoActive}
        actionsTaken={actionsTaken}
      />
    </div>
  );
};

export default ProductUiPanel;
