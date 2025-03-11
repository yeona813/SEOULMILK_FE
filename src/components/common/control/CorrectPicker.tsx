interface PickerProps {
  correctCount: number;
  inCorrectCount: number;
  isSuccess: string;
  setIsSuccess: (type: string) => void;
}

/**
 *
 * @param correctCount - 성공 건수
 * @param inCorrectCount - 실패 건수
 * @param isSuccess - 현재 Picker
 * @param setIsSuccess - 현재 Picker의 값을 변경하는 함수
 * @returns
 */
const CorrectPicker = ({
  correctCount,
  inCorrectCount,
  isSuccess,
  setIsSuccess,
}: PickerProps) => {
  const allOptions = [
    {
      type: "SUCCESS",
      count: correctCount,
      activeColor: "text-secondary-300",
    },
    {
      type: "FAILED",
      count: inCorrectCount,
      activeColor: "text-primary-300",
    },
  ];

  const currentIndex = allOptions.findIndex(
    (option) => option.type === isSuccess
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
            ${isSuccess === type ? `${activeColor}` : "text-grayScale-500"}`}
          onClick={() => setIsSuccess(type)}
        >
          {type === "SUCCESS" ? "성공" : "실패"} {count}건
        </div>
      ))}
    </div>
  );
};

export default CorrectPicker;
