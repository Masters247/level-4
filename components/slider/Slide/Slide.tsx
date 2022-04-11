import Image from "next/image";
import cn from "classnames";
import s from "./slide.module.scss";

const Slide = ({ active, id, style, image, position, widthHeight }: any) => {
  const seen = id === active ? style : 0;

  return (
    <div
      style={{
        position: position,
      }}>
      <div
        className={cn(s.slide, widthHeight)}
        style={{
          opacity: seen,
        }}>
        <Image
          quality={100}
          priority={true}
          src={image}
          layout="fill"
          alt="Caps"
        />
      </div>
    </div>
  );
};

export default Slide;
