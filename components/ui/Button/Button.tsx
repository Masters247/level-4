/* eslint-disable react/display-name */
import {
  ButtonHTMLAttributes,
  FC,
  JSXElementConstructor,
  forwardRef,
  useRef,
} from "react";
import cn from "classnames";
import s from "./button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "tertiary";
  loading?: boolean;
  disabled?: boolean;
  classname?: string;
  Component?: string | JSXElementConstructor<any>;
  href?: string;
}

const Button: FC<Props> = forwardRef(
  (
    {
      children,
      variant = "primary",
      loading = false,
      className,
      disabled = false,
      // What HTML element to render
      Component = "a",
      href,
      ...rest
    },
    buttonRef
  ): JSX.Element => {
    const ref = useRef<typeof Component>(null);
    const rootClassName = cn(
      s.button,
      {
        [s.primary]: variant === "primary",
        [s.secondary]: variant === "secondary",
        [s.tertiary]: variant === "tertiary",
        [s.loading]: loading,
        [s.disabled]: disabled,
      },
      className
    );
    return (
      <Component className={rootClassName} ref={ref} href={href} {...rest}>
        {loading ? "Loading..." : children}
      </Component>
    );
  }
);

export default Button;
