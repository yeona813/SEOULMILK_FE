import { useState } from "react";

interface PickerProps {
  totalCount: number;
  correctCount: number;
  inCorrectCount: number;
}

enum PickType {
  TOTAL = "전체",
  CORRECT = "일치",
  INCORRECT = "불일치",
}

/**
 *
 * @param totalCount - 전체 건수
 * @param correctCount - 일치 건수
 * @param inCorrectCount - 불일치 건수
 * @returns
 */
const Picker = ({ totalCount, correctCount, inCorrectCount }: PickerProps) => {
  const allOptions = [
    {
      type: PickType.TOTAL,
      count: totalCount,
      activeColor: "text-grayScale-600",
    },
    {
      type: PickType.CORRECT,
      count: correctCount,
      activeColor: "text-secondary-300",
    },
    {
      type: PickType.INCORRECT,
      count: inCorrectCount,
      activeColor: "text-primary-300",
    },
  ];

  const [currentPick, setCurrentPick] = useState(PickType.TOTAL);

  const currentIndex = allOptions.findIndex(
    (option) => option.type === currentPick
  );
  const translateXValue = `${currentIndex * 100}%`;

  return (
    <div className="relative flex h-fit rounded-lg w-fit p-[2px] bg-grayScale-100 overflow-hidden">
      <div
        className="absolute top-[2px] left-[2px] w-[100px] h-[28px] bg-white rounded-[7px] transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(${translateXValue})`,
        }}
      />
      {allOptions.map(({ type, count, activeColor }) => (
        <div
          key={type}
          className={`center relative w-[100px] h-[28px] b3 font-semibold rounded-[7px] cursor-pointer
            ${currentPick === type ? `${activeColor}` : "text-grayScale-500"}`}
          onClick={() => setCurrentPick(type)}
        >
          {type} {count}건
        </div>
      ))}
    </div>
  );
};

export default Picker;
