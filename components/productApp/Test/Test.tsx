import { useCallback, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import s from "./test.module.scss";

const Test = () => {
  const [isResizing, setIsResizing] = useState(false);
  const [{ x, y, width, height }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  }));

  const bind = useDrag();

  const handleTestClick = () => {
    console.log("clicked");
  };

  const onResize = useCallback(() => {
    api.set({
      x: 20,
      y: 20,
      width: 100,
      height: 100,
    });
  }, []);

  return (
    <div className={s.testWrap}>
      <animated.div className={s.test} style={{ x, y, width, height }}>
        Test
        <div className={s.resizer}></div>
      </animated.div>
      <button
        style={{
          zIndex: "4",
          display: "block",
          position: "absolute",
          right: "0",
        }}
        onClick={onResize}>
        test
      </button>
    </div>
  );
};

export default Test;
