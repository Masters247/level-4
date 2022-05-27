import { FC } from "react";
import s from "./spinner.module.scss";

interface Props {
  colour: string;
}

const Spinner: FC<Props> = ({ colour }) => {
  // const colour = "#000000";
  return (
    <div className={s.ldsRing}>
      <div
        style={{
          border: `1px solid ${colour}`,
          borderColor: `${colour} transparent transparent transparent`,
        }}
      ></div>
      <div
        style={{
          border: `1px solid ${colour}`,
          borderColor: `${colour} transparent transparent transparent`,
        }}
      ></div>
      <div
        style={{
          border: `1px solid ${colour}`,
          borderColor: `${colour} transparent transparent transparent`,
        }}
      ></div>
      <div
        style={{
          border: `1px solid ${colour}`,
          borderColor: `${colour} transparent transparent transparent`,
        }}
      ></div>
    </div>
  );
};

export default Spinner;
