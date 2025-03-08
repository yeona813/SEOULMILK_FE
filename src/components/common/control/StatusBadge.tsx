interface StatusBadgeProps {
  status: "성공" | "실패" | "합계";
  count: number;
}

/**
 *
 * @param status - "성공" | "실패" | "합계계"
 * @param count - status의 건수
 * @returns
 */
const StatusBadge = ({ status, count }: StatusBadgeProps) => {
  const statusStyles = {
    성공: "bg-secondary-25 text-secondary-500",
    실패: "bg-primary-50 text-primary-500",
    합계: "bg-grayScale-50 text-grayScale-500",
  };

  return (
    <div className="flex gap-[6px]">
      <div
        className={`px-[10px] py-[1px] w-[47px] b3 rounded text-center ${statusStyles[status]}`}
      >
        {status}
      </div>
      <p className="b4 text-grayScale-700">{count}건</p>
    </div>
  );
};

export default StatusBadge;
