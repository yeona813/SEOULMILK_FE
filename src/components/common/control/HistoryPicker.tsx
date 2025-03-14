import { useState } from "react";

enum PickType {
  THIS_MONTH = "이번달",
  LAST_HISTORY = "지난내역 확인",
}

const HistoryPicker = () => {
  const [currentPick, setCurrentPick] = useState(PickType.THIS_MONTH);
  const allOptions = Object.values(PickType);
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
          className={`center relative w-[100px] h-[28px] b3 rounded-[7px]
            ${currentPick === type ? "text-grayScale-600" : "text-grayScale-500"} cursor-pointer`}
          onClick={() => setCurrentPick(type)}
        >
          {type}
        </div>
      ))}
    </div>
  );
};

export default HistoryPicker;
