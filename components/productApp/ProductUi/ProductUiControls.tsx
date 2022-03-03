import s from "./productUiControls.module.scss";
import Center from "../../ui/icons/Center";
import HorizontalAlign from "../../ui/icons/HorizontalAlign";
import VerticalAlign from "../../ui/icons/VerticalAlign";
import { FC } from "react";

const ProcuctUiControls = ({ center, vertical, horizontal }: any) => {
  const controls = [
    {
      name: "c",
      icon: <Center styles={s.center} />,
      function: center,
    },
    {
      name: "cv",
      icon: <VerticalAlign styles={s.centerVertical} />,
      function: vertical,
    },
    {
      name: "ch",
      icon: <HorizontalAlign styles={s.centerHorizontal} />,
      function: horizontal,
    },
  ];
  return (
    <div className={s.uiControlsWrap}>
      {controls.map((cont: any) => {
        return (
          <button key={cont.name} onClick={cont.function} className={s.control}>
            {cont.icon}
          </button>
        );
      })}
    </div>
  );
};

export default ProcuctUiControls;
