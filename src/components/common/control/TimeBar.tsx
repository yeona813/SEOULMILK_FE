import { useState, useEffect } from "react";

interface TimeBarProps {
  totalTime: number;
}

/**
 *
 * @param totalTime - totalTime
 * @returns
 */
const TimeBar = ({ totalTime }: TimeBarProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (elapsedTime < totalTime) {
      const interval = setTimeout(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);

      return () => clearTimeout(interval);
    }
  }, [elapsedTime, totalTime]);

  const progress = (elapsedTime / totalTime) * 100;

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="relative w-full h-2 rounded-[28px] bg-grayScale-50">
        <div
          className="absolute top-0 left-0 h-full transition-all duration-1000 rounded-[28px] bg-secondary-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-grayScale-500 b4">
        남은 예상시간: {totalTime - elapsedTime}초
      </span>
    </div>
  );
};

export default TimeBar;
