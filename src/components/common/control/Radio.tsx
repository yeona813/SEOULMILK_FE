import { useState } from "react";

const Radio = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className="relative flex items-center cursor-pointer"
      onClick={() => setSelected(!selected)}
    >
      <div
        className={`w-[18px] h-[18px] rounded-full border transition-all duration-200 center hover:border-secondary-300
          ${selected ? "border-secondary-300" : "border-grayScale-200"}
        `}
      >
        {selected && (
          <div className="w-[10px] h-[10px] bg-secondary-300 rounded-full transition-all duration-200" />
        )}
      </div>
    </div>
  );
};

export default Radio;
