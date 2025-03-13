import CheckBox from "../common/control/CheckBox";

interface ShopTableItemProps {
  check: boolean;
  number: number;
  agencyName: string;
  email: string;
  validationResult: string;
  onCheckChange: (checked: boolean) => void;
}

/**
 *
 * VerifyTableItem 컴포넌트는 테이블의 각 항목을 표시하는 컴포넌트입니다.
 * @param {boolean} check - 체크박스의 선택 상태
 * @param {number} number - 항목 번호
 * @param {string} agencyName - 대리점명
 * @param {string} email - 이메일
 * @param {string} validationResult - 상태
 * @param {(checked: boolean) => void} onCheckChange - 체크박스 상태 변경 시 호출되는 함수
 * @return
 */
const ShopTableItem = ({
  check,
  number,
  agencyName,
  email,
  validationResult,
  onCheckChange,
}: ShopTableItemProps) => {
  const formattedNumber = number.toString().padStart(3, "0");

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
    >
      <div className="w-[34px] center mr-2" onClick={handleCheckboxClick}>
        <CheckBox checked={check} onChange={handleCheckboxChange} />
      </div>
      <div className="w-[150px] 3xl:w-[200px]">{formattedNumber}</div>
      <div className="w-[300px] 3xl:w-[450px]">{agencyName}</div>
      <div className="w-[250px] 3xl:w-[440px]">{email}</div>
      <div className="w-[53px] flex items-center">
        {validationResult === "승인" ? (
          <div className="w-[47px] text-center text-secondary-500 bg-secondary-25 border-secondary-200 border border-solid h-6 rounded">
            가입
          </div>
        ) : (
          <div className="w-[47px] text-center text-primary-500 bg-primary-50 border-primary-200 border border-solid h-6 rounded">
            미가입
          </div>
        )}
      </div>
    </div>
  );
};
export default ShopTableItem;
