import Image from "next/image";
import s from "./slide.module.scss";

const Slide = ({ active, id, style, image, position }: any) => {
  const seen = id === active ? style : 0;

  return (
    <div
      style={{
        position: position,
      }}
    >
      <div
        className={s.slide}
        style={{
          opacity: seen,
        }}
      >
        <Image
          quality={100}
          priority={true}
          src={image}
          layout="fill"
          alt="Golf-Foundation Home Page"
          placeholder="blur"
        />
      </div>
    </div>
  );
};

export default Slide;
