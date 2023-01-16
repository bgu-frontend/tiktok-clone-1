import React from "react";
import { PropsWithChildren } from "react";

type Props = {
  filled?: boolean;
  width?: number;
  lgWidth?: number;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<PropsWithChildren<Props>> = ({
  onClick,
  width,
  lgWidth,
  filled,
  className,
  children,
}) => {
  const btnClasses = `w-${width} lg:w-${lgWidth} outline-none font-medium p-2 rounded ${
    filled ? "bg-[var(--primary-color)] text-white" : "border-gray-300 border-2"
  }`;
  return (
    <button onClick={onClick} type="button" className={className || btnClasses}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  width: 28,
  lgWidth: 44,
};

export default Button;
