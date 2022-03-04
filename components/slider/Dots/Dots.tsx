import s from "./dots.module.scss";

const Dots = ({ slides, active }: any) => {
  return (
    <div className={s.dotsWrap}>
      {slides.map((dots: any, i: any) => {
        function handleClick(i: any) {
          console.log("clicked", i);
        }
        return (
          <button
            onClick={() => handleClick(i)}
            key={dots.image + i}
            className={i === active ? s.active : s.dots}
          ></button>
        );
      })}
    </div>
  );
};

export default Dots;
