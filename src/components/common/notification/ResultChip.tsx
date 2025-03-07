interface ResultChipProps {
  type: "일치" | "불일치";
}

/**
 *
 * @param type - "일치" | "불일치"
 * @returns
 */
const ResultChip = ({ type }: ResultChipProps) => {
  const isCorrect = type === "일치";

  return (
    <div
      className={`w-[47px] h-6 center b5 rounded-[4px] ${isCorrect ? "text-secondary-500 bg-secondary-25" : "text-primary-500 bg-primary-50"}`}
    >
      {type}
    </div>
  );
};

export default ResultChip;
