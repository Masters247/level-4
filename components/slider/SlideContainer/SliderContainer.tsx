import { useState } from "react";
import Thumbnails from "../Thumbnails/Thumbnails";
import Slider from "../Slider/Slider";
import s from "./sliderContainer.module.scss";

const SliderContainer = ({ width, height, position, images, time }: any) => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [timeOf, setTime] = useState(time);
  const [positionOf, setPosition] = useState(position);
  const [heightOf, setHeight] = useState(width);
  const [widthOf, setWidth] = useState(height);

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
        numberOfSlides={images.length}
        slides={images}
        time={timeOf}
        positioning={positionOf}
      />
      <Thumbnails thumbnails={images} />
    </section>
  );
};

export default SliderContainer;
