import { FC } from "react";
import cn from "classnames";
import Slide from "../Slide/Slide";
import s from "./slider.module.scss";

interface Props {
  autoPlay: boolean;
  numberOfSlides: number;
  positioning?: string;
  slides: { image: StaticImageData }[];
  time: number;
  activeSlide: number;
  opacity: number;
}

const Slider: FC<Props> = ({ positioning, activeSlide, opacity, slides }) => {
  return (
    <div className={cn(s.slider, s.widthHeight)}>
      {slides.map((slide: any, i: number) => {
        return (
          <Slide
            widthHeight={s.widthHeight}
            style={opacity}
            key={slide + i}
            image={slide}
            id={i}
            position={positioning}
            active={activeSlide}
          />
        );
      })}
    </div>
  );
};

export default Slider;
