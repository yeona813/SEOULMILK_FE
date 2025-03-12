import { useAdminPickerStore } from "@/stores/useAdminStore";
import { useState } from "react";

interface PickerProps {
  totalCount?: number;
  correctCount?: number;
  inCorrectCount?: number;
}

enum PickType {
  TOTAL = "전체",
  CORRECT = "일치",
  INCORRECT = "불일치",
}

const TotalPicker = ({
  totalCount,
  correctCount,
  inCorrectCount,
}: PickerProps) => {
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

  const { setStatus } = useAdminPickerStore();
  const [currentPick, setCurrentPick] = useState<PickType>(PickType.TOTAL);

  const currentIndex = allOptions.findIndex(
    (option) => option.type === currentPick
  );

  const handlePick = (pickType: PickType) => {
    setCurrentPick(pickType);
    const status =
      pickType === PickType.TOTAL
        ? undefined
        : pickType === PickType.CORRECT
          ? "APPROVAL"
          : "REJECTION";
    setStatus(status);
  };

  const translateXValue = `${currentIndex * 100}%`;

  return (
    <div className="relative flex h-fit rounded-lg w-fit p-[2px] bg-grayScale-100 overflow-hidden">
      <div
        className="absolute top-[2px] left-[2px] w-[100px] h-[28px] bg-white rounded-[7px] transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(${translateXValue})` }}
      />
      {allOptions.map(({ type, count, activeColor }) => (
        <div
          key={type}
          className={`center relative w-[100px] h-[28px] b3 font-semibold rounded-[7px] cursor-pointer
            ${currentPick === type ? activeColor : "text-grayScale-500"}`}
          onClick={() => handlePick(type)}
        >
          {type} {count}건
        </div>
      ))}
    </div>
  );
};

export default TotalPicker;
