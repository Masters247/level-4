import ResizeImage from "../resize-image/ResizeImage";
import Resize from "../resize-image/Resize";
import s from "./productUi.module.scss";

const ProductUi = () => {
  return (
    <div className={s.productUi}>
      <Resize />
      {/* <ResizeImage /> */}
    </div>
  );
};
export default ProductUi;
