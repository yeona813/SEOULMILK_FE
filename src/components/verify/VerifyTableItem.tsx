import CheckBox from "../common/control/CheckBox";

interface VerifyTableItemProps {
  check: boolean;
  newly: boolean;
  number: number;
  supplier: string;
  retailer: string;
  date: string;
  amount: number;
  validationResult: boolean;
  onCheckChange: (checked: boolean) => void;
}

/**
 *
 * VerifyTableItem 컴포넌트는 테이블의 각 항목을 표시하는 컴포넌트입니다.
 * @param {boolean} check - 체크박스의 선택 상태
 * @param {boolean} newly - 신규 항목 여부
 * @param {number} number - 항목 번호
 * @param {string} supplier - 공급자
 * @param {string} retailer - 공급 받는자
 * @param {string} date - 작성일자
 * @param {number} amount - 공급가액 (금액)
 * @param {boolean} validationResult - 검증 결과 (일치/불일치)
 * @param {(checked: boolean) => void} onCheckChange - 체크박스 상태 변경 시 호출되는 함수
 * @return
 */
const VerifyTableItem = ({
  check,
  newly,
  number,
  supplier,
  retailer,
  date,
  amount,
  validationResult,
  onCheckChange,
}: VerifyTableItemProps) => {
  const formattedNumber = number.toString().padStart(3, "0");

  // 금액에 컴마 추가
  const formattedAmount = amount.toLocaleString();

  // 배경색을 선택 상태에 따라 다르게 설정
  const rowClass = check ? "bg-grayScale-100" : "";

  return (
    <div
      className={`flex items-center h-10 mt-[6px] mx-[7px] text-grayScale-700 b4 rounded-lg ${rowClass}`}
    >
      <div className="w-[33px] center mr-2">
        <CheckBox
          checked={check}
          onChange={(e) => onCheckChange(e.target.checked)}
        />
      </div>
      <div className="w-[39px] 3xl:w-[50px]">{formattedNumber}</div>
      <div className="w-[79px]">
        {newly && (
          <div className="w-[47px] text-center text-warning-500 bg-warning-50 border-warning-300 border border-solid h-6 rounded">
            신규
          </div>
        )}
      </div>
      <div className="w-[336px] 3xl:w-[400px]">{supplier}</div>
      <div className="w-[300px] 3xl:w-[400px]">{retailer}</div>
      <div className="w-[174px] 3xl:w-[250px]">{date}</div>
      <div className="w-[164px] 3xl:w-[250px]">{formattedAmount}</div>{" "}
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

export default VerifyTableItem;
