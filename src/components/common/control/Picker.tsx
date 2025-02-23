import { useState } from "react";

interface PickerProps {
  correctCount: number;
  inCorrectCount: number;
}

enum PickType {
  CORRECT = "일치",
  INCORRECT = "불일치",
}

/**
 *
 * @param correctCount - 일치 건수
 * @param inCorrectCount - 불일치 건수
 * @returns
 */
const Picker = ({ correctCount, inCorrectCount }: PickerProps) => {
  const options = [
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

  const [currentPick, setCurrentPick] = useState(PickType.CORRECT);

  return (
    <div className="relative flex h-fit rounded-lg w-[256px] p-[2px] bg-grayScale-100 overflow-hidden">
      <div
        className="absolute top-[2px] left-[2px] w-[126px] h-[28px] bg-white rounded-[7px] transition-transform duration-300 ease-in-out"
        style={{
          transform:
            currentPick === PickType.INCORRECT
              ? "translateX(100%)"
              : "translateX(0%)",
        }}
      />
      {options.map(({ type, count, activeColor }) => (
        <div
          key={type}
          className={`center relative w-[126px] h-[28px] text-b3 font-medium rounded-[7px]
            ${currentPick === type ? `${activeColor} font-semibold` : "text-grayScale-500"}`}
          onClick={() => setCurrentPick(type)}
        >
          {type} {count}건
        </div>
      ))}
    </div>
  );
};

export default Picker;
