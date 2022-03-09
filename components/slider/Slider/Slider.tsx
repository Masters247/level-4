import { FC, useState, useEffect, useRef } from "react";
import Dots from "../Dots/Dots";
import SlideContainer from "../SlideContainer/SlideContainer";
import Slide from "../Slide/Slide";
import s from "./slider.module.scss";

interface Props {
  autoPlay: boolean;
  numberOfSlides: number;
  positioning?: string;
  slides: { image: StaticImageData }[];
  time: number;
  width: string;
  height: string;
}

const Slider: FC<Props> = ({
  autoPlay,
  numberOfSlides,
  positioning,
  slides,
  time,
  width,
  height,
}) => {
  const [state, setState] = useState({
    opacity: 1,
    position: positioning,
    activeSlide: 0,
  });

  const { opacity, position, activeSlide } = state;
  const autoPlayRef: any = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    if (autoPlay === true) {
      const interval = setInterval(play, time);
      return () => clearInterval(interval);
    }
  }, [numberOfSlides, autoPlay, time]);

  const nextSlide = () => {
    if (activeSlide === slides.length - 1) {
      return setState({
        ...state,
        activeSlide: 0,
      });
    }
    setState({
      ...state,
      activeSlide: activeSlide + 1,
    });
  };

  const prevSlide = () => {
    if (activeSlide === 0) {
      return setState({
        ...state,
        activeSlide: slides.length - 1,
      });
    }
    setState({
      ...state,
      activeSlide: activeSlide - 1,
    });
  };

  return (
    <div className={s.slider}>
      <SlideContainer>
        {slides.map((slide: any, i: number) => {
          return (
            <Slide
              width={width}
              height={height}
              style={opacity}
              key={slide + i}
              image={slide}
              id={i}
              position={position}
              active={activeSlide}
            />
          );
        })}
      </SlideContainer>
    </div>
  );
};

export default Slider;
