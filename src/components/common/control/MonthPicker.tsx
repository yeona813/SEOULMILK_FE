import { useState } from "react";

enum MonthPickType {
  ONE = "1개월",
  THREE = "3개월",
  SIX = "6개월",
  TWELVE = "12개월",
}

const MonthPicker = () => {
  const [currentPick, setCurrentPick] = useState(MonthPickType.ONE);
  const allOptions = Object.values(MonthPickType);
  const translateXValue = `${allOptions.indexOf(currentPick) * 100}%`;

  return (
    <div className="relative flex h-fit rounded-lg w-fit p-[2px] bg-grayScale-100 overflow-hidden">
      <div
        className="absolute top-[2px] left-[2px] w-[100px] h-[28px] bg-white rounded-[7px] transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(${translateXValue})`,
        }}
      />
      {allOptions.map((type) => (
        <div
          key={type}
          className={`center relative w-[100px] h-[28px] text-b3 font-semibold rounded-[7px] cursor-pointer
              ${currentPick === type ? "text-grayScale-600" : "text-grayScale-500"}`}
          onClick={() => setCurrentPick(type)}
        >
          {type}
        </div>
      ))}
    </div>
  );
};

export default MonthPicker;
