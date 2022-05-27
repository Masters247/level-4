/* eslint-disable react/display-name */
import {
  ButtonHTMLAttributes,
  FC,
  JSXElementConstructor,
  forwardRef,
  useRef,
  Component,
} from "react";
import cn from "classnames";
import s from "./productButton.module.scss";
import Undo from "../../ui/icons/Undo";
import Redo from "../../ui/icons/Redo";
import Save from "../../ui/icons/Save";
import Download from "../../ui/icons/Download";
import Tick from "../../ui/icons/Tick";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "primary-dashed" | "secondary" | "tertiary";
  loading?: boolean;
  loaded?: boolean;
  // classname: string;
  Component?: string | JSXElementConstructor<any>;
  href?: string;
  icon?: any;
  undo?: boolean;
  redo?: boolean;
  download?: boolean;
  tick?: boolean;
  save?: boolean;
  loadingText?: string;
  loadedText?: string;
}

const ProductButton: FC<Props> = forwardRef(
  (
    {
      children,
      variant,
      icon,
      loadingText,
      loadedText,
      loading = false,
      loaded = false,
      className,
      disabled = false,
      Component = "button",
      href,
      undo = false,
      redo = false,
      download = false,
      tick = false,
      save = false,
      ...rest
    },
    buttonRef
  ): JSX.Element => {
    const ref = useRef<typeof Component>(null);

    const rootClassName = cn(
      s.button,
      {
        [s.primary]: variant === "primary",
        [s.primaryDashed]: variant === "primary-dashed",
        [s.secondary]: variant === "secondary",
        [s.tertiary]: variant === "tertiary",
        [s.loading]: loading,
        [s.disabled]: disabled,
      },
      className
    );

    const iconRootName = cn(s.icon, {
      [s.disabledIcon]: disabled,
    });
    return (
      <Component
        className={rootClassName}
        ref={ref}
        href={href}
        {...rest}
        disabled={disabled}>
        {tick && <Tick styles={iconRootName} />}
        {undo && <Undo styles={iconRootName} />}
        {redo && <Redo styles={iconRootName} />}
        {save && <Save styles={iconRootName} />}
        {download && <Download styles={iconRootName} />}
        {loading ? { loadingText } : children}
      </Component>
    );
  }
);

export default ProductButton;
