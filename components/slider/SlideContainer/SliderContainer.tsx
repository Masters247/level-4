import { useState, useEffect, useRef } from "react";
import Thumbnails from "../Thumbnails/Thumbnails";
import Slider from "../Slider/Slider";
import s from "./sliderContainer.module.scss";

const SliderContainer = ({ position, slides, time }: any) => {
  const [state, setState] = useState({
    opacity: 1,
    positioning: position,
    activeSlide: 0,
  });

  // console.log("slides", slides.length);
  const { opacity, positioning, activeSlide } = state;
  const autoPlayRef: any = useRef();

  const [autoPlay, setAutoPlay] = useState(true);
  const [timeOf, setTime] = useState(1000);
  const numberOfSlides = slides.length;

  // console.log("number of slides", slides.length);

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
  }, [autoPlay, time]);

  const handleEnter = () => {
    setAutoPlay(false);
  };

  const handleLeave = () => {
    setAutoPlay(true);
  };

  const nextSlide = () => {
    // console.log("active slide", activeSlide);
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

  const handleThumbSlide = (i: any) => {
    setState({
      ...state,
      activeSlide: i,
    });
  };

  return (
    <section
      className={s.sliderContainer}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      <Slider
        autoPlay={autoPlay}
        numberOfSlides={slides.length}
        slides={slides}
        time={timeOf}
        positioning={positioning}
        opacity={opacity}
        activeSlide={activeSlide}
      />
      {slides.length > 1 && (
        <Thumbnails
          thumbnails={slides}
          handleThumbSlide={handleThumbSlide}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
          activeSlide={activeSlide}
        />
      )}
    </section>
  );
};

export default SliderContainer;
