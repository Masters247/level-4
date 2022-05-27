import s from "./thumb.module.scss";
import cn from "classnames";
import Image from "next/image";

const Thumb = ({
  thumb,
  thumbWidth,
  index,
  handleThumbSlide,
  activeSlide,
}: any) => {
  return (
    <button
      onClick={() => handleThumbSlide(index)}
      className={cn(s.thumb, thumbWidth, index === activeSlide && s.active)}
    >
      <Image src={thumb} layout="responsive" width={100} height={100} alt="" />
    </button>
  );
};

export default Thumb;
