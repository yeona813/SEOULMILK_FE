interface ProgressBarProps {
  currentNumber: number;
}

/**
 *
 * @param currentNumber - 현재 진행 중인 숫자
 * @returns
 */
const ProgressBar = ({ currentNumber }: ProgressBarProps) => {
  const numbers = [
    { id: "step-1", value: 1 },
    { id: "step-2", value: 2 },
    { id: "step-3", value: 3 },
    { id: "step-4", value: 4 },
    { id: "step-5", value: 5 },
  ];

  return (
    <div className="center">
      {numbers.map(({ id, value }) => (
        <div key={id} className="center">
          <div
            className={`w-5 h-5 center ${
              value <= currentNumber
                ? "bg-secondary-300 text-white"
                : "bg-grayScale-100 text-grayScale-500"
            } rounded-xl b5`}
          >
            {value}
          </div>

          {value !== 5 && (
            <div
              className={`w-[66px] h-[2px] ${
                value < currentNumber ? "bg-secondary-300" : "bg-grayScale-100"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
