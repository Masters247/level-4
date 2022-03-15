import s from "./productColourButtons.module.scss";

const ProductColourButtons = ({
  hex,
  handleColourClick,
  i,
  hexSecondary,
}: any) => {
  const styleSingleColour = {
    backgroundColor: `${hexSecondary}`,
    border: `${hexSecondary === hex ? "1px solid #909090" : "5px solid" + hex}`,
  };

  return (
    <div onClick={(e) => handleColourClick(e, i)} className={s.border}>
      <button className={s.colour} style={styleSingleColour}></button>
    </div>
  );
};

export default ProductColourButtons;
