import CheckBox from "../common/control/CheckBox";

interface UsersTableItemProps {
  check: boolean;
  number: number;
  name: string;
  id: string;
  email: string;
  agency: string;
  onCheckChange: (checked: boolean) => void;
  onClick: () => void;
}

/**
 *
 * UsersTableItem 컴포넌트는 테이블의 각 항목을 표시하는 컴포넌트입니다.
 * @param {boolean} check - 체크박스의 선택 상태
 * @param {number} number - 항목 번호
 * @param {string} name - 이름
 * @param {string} id - 아이디
 * @param {string} email - 이메일
 * @param {string} agency - 담당 대리점
 * @param {(checked: boolean) => void} onCheckChange - 체크박스 상태 변경 시 호출되는 함수
 * @return
 */
const UsersTableItem = ({
  check,
  number,
  name,
  id,
  email,
  agency,
  onCheckChange,
  onClick,
}: UsersTableItemProps) => {
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
      onClick={onClick}
    >
      <div className="w-[34px] center mr-2" onClick={handleCheckboxClick}>
        <CheckBox checked={check} onChange={handleCheckboxChange} />
      </div>
      <div className="w-[118px] 3xl:w-[200px]">{formattedNumber}</div>
      <div className="w-[336px] 3xl:w-[400px]">{name}</div>
      <div className="w-[300px] 3xl:w-[400px]">{id}</div>
      <div className="w-[310px] 3xl:w-[400px]">{email}</div>
      <div className="w-[53px] flex items-center">{agency}</div>
    </div>
  );
};
export default UsersTableItem;
