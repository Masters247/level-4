import s from "./thumb.module.scss";
import Image from "next/image";

const Thumb = ({ thumb, width }: any) => {
  return (
    <div
      className={s.thumb}
      style={{
        width: `${width}`,
        height: `${width}`,
      }}
    >
      <Image src={thumb} layout="responsive" width={100} height={100} />
    </div>
  );
};

export default Thumb;
