import s from "./productUiControls.module.scss";
import Center from "../../ui/icons/Center";
import HorizontalAlign from "../../ui/icons/HorizontalAlign";
import VerticalAlign from "../../ui/icons/VerticalAlign";
import { FC } from "react";

const ProcuctUiControls = ({ center, vertical, horizontal }: any) => {
  const controls = [
    {
      name: "c",
      class: s.center,
      icon: <Center />,
      function: center,
    },
    {
      name: "cv",
      class: s.centerVertical,
      icon: <VerticalAlign />,
      function: vertical,
    },
    {
      name: "ch",
      class: s.centerHorizontal,
      icon: <HorizontalAlign />,
      function: horizontal,
    },
  ];
  return (
    <div className={s.uiControlsWrap}>
      {controls.map((cont: any) => {
        return (
          <button
            key={cont.name}
            onClick={cont.function}
            className={`${s.control} ${cont.class}`}
          >
            {cont.icon}
          </button>
        );
      })}
    </div>
  );
};

export default ProcuctUiControls;
