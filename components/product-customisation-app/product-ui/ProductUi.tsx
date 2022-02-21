import ResizeImage from "../resize-image/ResizeImage";
import s from "./productUi.module.scss";

const ProductUi = () => {
  return (
    <div className={s.productUi}>
      <ResizeImage />
    </div>
  );
};
export default ProductUi;
