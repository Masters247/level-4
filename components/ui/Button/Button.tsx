import { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";
import s from "./button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "tertiary";
  loading?: boolean;
  disabled?: boolean;
  classname?: string;
}

const Button: FC<Props> = ({
  children,
  variant = "primary",
  loading = false,
  className,
  disabled = false,
}) => {
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
  return <button className={rootClassName}>{children}</button>;
};

export default Button;
