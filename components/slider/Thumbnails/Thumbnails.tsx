import Thumb from "../Thumb/Thumb";
import Chevron from "../../ui/icons/Chevron";
import s from "./thumbnails.module.scss";

const Thumbnails = ({ thumbnails }: any) => {
  const width = "50px";
  const wrap = "150px";

  return (
    <div
      className={s.thumbnails}
      style={{
        width: `calc(${wrap} + 2em)`,
        gridTemplateColumns: `repeat(3, ${width})`,
      }}
    >
      <Chevron styles={s.chevLeft} />
      {thumbnails.map((thumb: any, i: any) => (
        <Thumb key={i} thumb={thumb} width={width} />
      ))}
      <Chevron styles={s.chevRight} />
    </div>
  );
};

export default Thumbnails;
s;
