import { useDataTaxStore } from "@/stores/useVerifyStore";
import { useState } from "react";

interface PickerProps {
  totalCount?: number;
  correctCount?: number;
  inCorrectCount?: number;
}

enum PickType {
  ALL = "전체",
  CORRECT = "일치",
  INCORRECT = "불일치",
}

const AllPicker = ({ totalCount, correctCount, inCorrectCount }: PickerProps) => {
  const allOptions = [
    {
      type: PickType.ALL,
      count: totalCount,
      activeColor: "text-grayScale-700",
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

  const { setStatus } = useDataTaxStore();
  const [currentPick, setCurrentPick] = useState<PickType>(PickType.ALL);

  const currentIndex = allOptions.findIndex(
    (option) => option.type === currentPick
  );

  const handlePick = (pickType: PickType) => {
    setCurrentPick(pickType);
    if (pickType === PickType.ALL) {
      setStatus(""); // 전체 선택 시 상태 초기화
    } else {
      const status = pickType === PickType.CORRECT ? "APPROVAL" : "REJECTION";
      setStatus(status);
    }
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
          {type} {count ?? 0}건
        </div>
      ))}
    </div>
  );
};

export default AllPicker;
