import { FC } from "react";
import s from "./pictureGrid.module.scss";

const TempArray = [
  { picture: "one" },
  { picture: "two" },
  { picture: "three" },
  { picture: "four" },
];

interface Props {
  radius?: String;
  title?: String;
}

const PictureGrid: FC<Props> = ({ radius, title }) => {
  return (
    <section className={s.pictureGridWrap}>
      <h2>{title}</h2>
      <div className={s.pictureGrid}>
        {TempArray.map((picture: any, i: number) => (
          <div
            key={i}
            className={s.picture}
            style={{ borderRadius: `${radius}` }}
          >
            <p>{picture.picture}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PictureGrid;
