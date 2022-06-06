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
import Remove from "../../ui/icons/Remove";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant:
    | "primary"
    | "primary-b"
    | "primary-dashed"
    | "secondary"
    | "tertiary"
    | "tertiary-b";
  loading?: boolean;
  loaded?: boolean;
  // classname: string;
  Component?: string | JSXElementConstructor<any>;
  href?: string;
  icon?: any;
  undo?: boolean;
  redo?: boolean;
  download?: boolean;
  remove?: boolean;
  tick?: boolean;
  save?: boolean;
  loadingText?: string;
  loadedText?: string;
}

const ProductButton: FC<Props> = forwardRef(
  (
    {
      remove = false,
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
        [s.primaryB]: variant === "primary-b",
        [s.primaryDashed]: variant === "primary-dashed",
        [s.secondary]: variant === "secondary",
        [s.tertiary]: variant === "tertiary",
        [s.tertiaryB]: variant === "tertiary-b",
        [s.loading]: loading,
        [s.disabled]: disabled,
      },
      className
    );

    const iconRootName = cn(s.icon, {
      [s.disabledIcon]: disabled,
    });
    // const iconRootNameRedo = cn(s.iconRedo, {
    //   [s.disabledIcon]: disabled,
    // });

    return (
      <Component
        className={rootClassName}
        ref={ref}
        href={href}
        {...rest}
        disabled={disabled}
      >
        {tick && <Tick styles={iconRootName} />}
        {remove && <Remove styles={iconRootName} />}
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
