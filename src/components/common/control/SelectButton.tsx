import { useState } from "react";

interface SelectButtonProps {
  children: React.ReactNode;
}

const SelectButton = ({ children }: SelectButtonProps) => {
  const [isSelected, setIsSeletecd] = useState(false);

  const selectHandler = () => {
    setIsSeletecd((prev) => !prev);
  };

  const getClass = () => {
    return isSelected === true
      ? "bg-grayScale-100 text-grayScale-600"
      : "bg-grayScale-25 text-grayScale-400";
  };

  return (
    <button
      className={`py-[2px] rounded-[13px] b2 px-[11px] ${getClass()} `}
      onClick={selectHandler}
    >
      {children}
    </button>
  );
};

export default SelectButton;
