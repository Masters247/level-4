import Thumb from "../Thumb/Thumb";
import Chevron from "../../ui/icons/Chevron";
import s from "./thumbnails.module.scss";
import { useState, useEffect } from "react";

const Thumbnails = ({
  thumbnails,
  prevSlide,
  nextSlide,
  handleThumbSlide,
  activeSlide,
}: any) => {
  const [marginState, setMarginState] = useState(0);
  const [thumbNailswidth, setThumbNailsWidth] = useState(240);
  const [thumbWidths, setThumbWidths] = useState(70);

  useEffect(() => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 650) {
      setThumbWidths(100);
      setThumbNailsWidth(333);
    }

    if (screenWidth >= 950) {
      setThumbWidths(150);
      setThumbNailsWidth(480);
    }

    // console.log(thumbNailswidth, "thumbNailsWith");

    if (activeSlide === 0 || activeSlide === 2) {
      setMarginState(0);
    }
    if (activeSlide === 3 || activeSlide === 5) {
      setMarginState(thumbNailswidth);
    }
    if (activeSlide === 6) {
      setMarginState(thumbNailswidth * 2);
    }
  }, [activeSlide, thumbWidths, thumbNailswidth]);

  return (
    <div className={s.thumbnailsOuterWrap}>
      <Chevron styles={s.chevLeft} prevSlide={prevSlide} left={true} />
      <div className={s.thumbnailsWrap}>
        <div
          className={s.thumbnails}
          style={{
            gridTemplateColumns: `repeat(${thumbnails.length}, ${thumbWidths}px)`,
            marginLeft: `calc(-${marginState}px)`,
          }}
        >
          {thumbnails.map((thumb: any, i: any) => (
            <Thumb
              key={i}
              index={i}
              thumb={thumb}
              thumbWidth={s.thumbWidth}
              handleThumbSlide={handleThumbSlide}
              activeSlide={activeSlide}
            />
          ))}
        </div>
      </div>
      <Chevron styles={s.chevRight} nextSlide={nextSlide} right={true} />
    </div>
  );
};

export default Thumbnails;
