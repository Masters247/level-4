import { useState } from "react";
import Thumbnails from "../Thumbnails/Thumbnails";
import Slider from "../Slider/Slider";
import s from "./sliderContainer.module.scss";

const SliderContainer = ({ width, height, position, slides, time }: any) => {
  const [state, setState] = useState({
    opacity: 1,
    // position: positioning,
    activeSlide: 0,
  });
  const { opacity, activeSlide } = state;

  const [autoPlay, setAutoPlay] = useState(true);
  const [timeOf, setTime] = useState(time);
  const [positionOf, setPosition] = useState(position);
  const [heightOf, setHeight] = useState(width);
  const [widthOf, setWidth] = useState(height);

  const nextSlide = () => {
    console.log("click next");
    setAutoPlay(false);
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
    console.log("click prev");
    setAutoPlay(false);
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

  const handleEnter = () => {
    setAutoPlay(false);
  };

  const handleLeave = () => {
    setAutoPlay(true);
  };
  return (
    <section
      className={s.sliderContainer}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      <Slider
        width={widthOf}
        height={heightOf}
        autoPlay={autoPlay}
        numberOfSlides={slides.length}
        slides={slides}
        time={timeOf}
        positioning={positionOf}
      />
      <Thumbnails thumbnails={slides} />
    </section>
  );
};

export default SliderContainer;
