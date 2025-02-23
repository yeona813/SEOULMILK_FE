import React from "react";

interface ButtonProps {
  size: "medium" | "large";
  color: "green" | "gray";
  disabled: boolean;
  children: React.ReactNode;
}

/**
 *
 * @param size - "medium" | "large"
 * @param color - "green" | "gray"
 * @param disabled - true or false
 *
 * @returns
 */
const Button = ({ size, color, disabled, children }: ButtonProps) => {
  // 버튼 사이즈에 따른 스타일을 설정하는 함수
  const getSizeClass = () => {
    return size === "large"
      ? "w-[118px] h-15 text-t1 font-bold"
      : "w-[97px] h-12 text-b1 font-bold";
  };

  // 버튼 색상 및 상태에 따른 스타일을 설정하는 함수
  const getColorClass = () => {
    if (disabled) {
      return color === "green"
        ? "bg-secondary-50 text-white"
        : "bg-grayScale-50 text-grayScale-300";
    }
    return color === "green"
      ? `bg-secondary-500 hover:bg-secondary-700 text-white`
      : `bg-grayScale-100 hover:bg-grayScale-300 text-grayScale-600`;
  };

  return (
    <button
      disabled={disabled}
      className={`${getSizeClass()} ${getColorClass()} text-center rounded-lg center`}
    >
      {children}
    </button>
  );
};

export default Button;
