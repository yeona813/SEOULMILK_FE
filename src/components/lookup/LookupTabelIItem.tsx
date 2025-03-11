import CheckBox from "../common/control/CheckBox";

interface LookupTableItemProps {
  check: boolean;
  number: number;
  supplier: string;
  retailer: string;
  date: string;
  amount: number;
  onCheckChange: (checked: boolean) => void;
}

/**
 *
 * SubmitTableItem 컴포넌트는 테이블의 각 항목을 표시하는 컴포넌트입니다.
 * @param {boolean} check - 체크박스의 선택 상태
 * @param {boolean} newly - 신규 항목 여부
 * @param {string} supplier - 공급자
 * @param {string} retailer - 공급 받는자
 * @param {string} date - 작성일자
 * @param {number} amount - 공급가액 (금액)
 * @param {(checked: boolean) => void} onCheckChange - 체크박스 상태 변경 시 호출되는 함수
 * @return
 */
const LookupTableItem = ({
  check,
  number,
  supplier,
  retailer,
  date,
  amount,
  onCheckChange,
}: LookupTableItemProps) => {
  const formattedNumber = number.toString().padStart(3, "0");

  // 금액에 컴마 추가
  const formattedAmount = amount.toLocaleString();

  // 배경색을 선택 상태에 따라 다르게 설정
  const rowClass = check ? "bg-grayScale-100" : "";

  return (
    <div
      className={`flex items-center h-10 mt-[6px] mx-[7px] text-grayScale-700 b4 rounded-lg ${rowClass} hover:bg-grayScale-50`}
    >
      <div className="w-[33px] center mr-2">
        <CheckBox
          checked={check}
          onChange={(e) => onCheckChange(e.target.checked)}
        />
      </div>
      <div className="w-[118px] 3xl:w-[200px]">{formattedNumber}</div>
      <div className="w-[358px] 3xl:w-[400px]">{supplier}</div>
      <div className="w-[356px] 3xl:w-[400px]">{retailer}</div>
      <div className="w-[193px] 3xl:w-[250px]">{date}</div>
      <div className="w-[144px] 3xl:w-[200px]">{formattedAmount}</div>
    </div>
  );
};

export default LookupTableItem;
