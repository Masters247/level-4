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

  const onResize = useCallback(() => {
    console.log("fired");
    setIsResizing(true);
    api.set({
      x: 20,
      y: 200,
    });
  }, []);

  return (
    <div className={s.testWrap}>
      <animated.div className={s.test} style={{ x, y, width, height }}>
        Test
        <div className={s.resizer}>
        </div>
      </animated.div>
    </div>
  );
};

export default Test;
