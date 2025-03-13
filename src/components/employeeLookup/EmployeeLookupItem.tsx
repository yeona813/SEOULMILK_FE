import CheckBox from "../common/control/CheckBox";

interface SubmitTableItemProps {
  check: boolean;
  number: number;
  supplier: string;
  retailer: string;
  date: string;
  amount: string;
  validationResult: boolean;
  onCheckChange: (checked: boolean) => void;
  onClick: () => void;
}

/**
 *
 * VerifyTableItem 컴포넌트는 테이블의 각 항목을 표시하는 컴포넌트입니다.
 * @param {boolean} check - 체크박스의 선택 상태
 * @param {number} number - 항목 번호
 * @param {string} supplier - 공급자
 * @param {string} retailer - 공급 받는자
 * @param {string} date - 작성일자
 * @param {number} amount - 공급가액 (금액)
 * @param {boolean} validationResult - 검증 결과 (일치/불일치)
 * @param {(checked: boolean) => void} onCheckChange - 체크박스 상태 변경 시 호출되는 함수
 * @return
 */
const EmployeeLookupItem = ({
  check,
  number,
  supplier,
  retailer,
  date,
  amount,
  validationResult,
  onCheckChange,
  onClick,
}: SubmitTableItemProps) => {
  const formattedNumber = number.toString().padStart(3, "0");

  // 금액에 컴마 추가
  const formattedAmount = amount.toLocaleString();

  // 배경색을 선택 상태에 따라 다르게 설정
  const rowClass = check ? "bg-grayScale-100" : "";

  const handleCheckboxClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  // 체크박스 상태 변경 처리
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckChange(event.target.checked);
  };
  return (
    <div
      className={`flex items-center h-10 mt-[6px] mx-[7px] text-grayScale-700 b4 rounded-lg ${rowClass} group hover:bg-grayScale-50 `}
      onClick={onClick}
    >
      <div className="w-[34px] center mr-2" onClick={handleCheckboxClick}>
        <CheckBox checked={check} onChange={handleCheckboxChange} />
      </div>
      <div className="w-[118px] 3xl:w-[200px]">{formattedNumber}</div>
      <div
        className={`w-[336px] 3xl:w-[400px] ${supplier === "" && "text-grayScale-300"}`}
      >
        {supplier === "" ? "OCR 누락" : supplier}
      </div>
      <div
        className={`w-[300px] 3xl:w-[400px] ${retailer === "" && "text-grayScale-300"}`}
      >
        {retailer === "" ? "OCR 누락" : retailer}
      </div>
      <div
        className={`w-[174px] 3xl:w-[250px] ${date === "" && "text-grayScale-300"}`}
      >
        {date === "" ? "OCR 누락" : date}
      </div>
      <div
        className={`w-[164px] 3xl:w-[180px] ${formattedAmount === "" && "text-grayScale-300"}`}
      >
        {formattedAmount === "" ? "OCR 누락" : formattedAmount}
      </div>
      {/* 수정된 부분 */}
      <div className="w-[53px] flex items-center">
        {validationResult ? (
          <div className="w-[47px] text-center text-secondary-500 bg-secondary-25 border-secondary-200 border border-solid h-6 rounded">
            일치
          </div>
        ) : (
          <div className="w-[47px] text-center text-primary-500 bg-primary-50 border-primary-200 border border-solid h-6 rounded">
            불일치
          </div>
        )}
      </div>
    </div>
  );
};
export default EmployeeLookupItem;
