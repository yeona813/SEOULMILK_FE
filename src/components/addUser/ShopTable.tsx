import { Agency } from "@/types/admin";
import CheckBox from "../common/control/CheckBox";
import ShopTableItem from "./ShopTableItem";

interface ShopTableProps {
  data: Agency[];
  checkedItem: number[];
  setCheckedItem: React.Dispatch<React.SetStateAction<number[]>>;
  isAllChecked: boolean;
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShopTable = ({
  data,
  checkedItem,
  setCheckedItem,
  isAllChecked,
  setIsAllChecked,
}: ShopTableProps) => {
  const handleCheckChange = (checked: boolean, id: number) => {
    setCheckedItem((prev) =>
      checked ? [...prev, id] : prev.filter((id) => id !== id)
    );
  };

  const handleAllCheckChange = (checked: boolean) => {
    if (checked) {
      setCheckedItem(data.map((item) => item.id!));
      setIsAllChecked(true);
    } else {
      setCheckedItem([]);
      setIsAllChecked(false);
    }
  };

  return (
    <>
      <div className="w-[858px] 3xl:w-[1200px] max-h-[597px] h-fit 3xl:max-h-[664px] 3xl:h-fit border border-solid border-grayScale-200 rounded bg-white overflow-y-auto overflow-x-hidden mb-[49px]">
        <div className="sticky top-0 flex flex-wrap h-10 text-left bg-white border-b border-solid border-grayScale-200 b5 text-grayScale-500">
          {/* 헤더 */}
          <div className="w-[34px] ml-[15px] flex items-center">
            <CheckBox
              checked={isAllChecked}
              onChange={(e) => handleAllCheckChange(e.target.checked)}
            />
          </div>
          <div className="w-[150px] 3xl:w-[200px] flex items-center">번호</div>
          <div className="w-[300px] 3xl:w-[450px] flex items-center">
            대리점명
          </div>
          <div className="w-[300px] 3xl:w-[440px] flex items-center">
            이메일
          </div>
          <div className="w-[50px] 3xl:w-[50px] flex items-center">상태</div>
        </div>
        <div>
          {/* 테이블 항목 반복 */}
          {data.length > 0 ? (
            data.map((item) => (
              <div className="w-[858px] 3xl:w-[1200px] mb-[6px]" key={item.id}>
                <ShopTableItem
                  check={checkedItem.includes(item.id!)}
                  number={item.id}
                  agencyName={item.agencyName}
                  email={item.email}
                  validationResult={item.status}
                  onCheckChange={(checked) =>
                    handleCheckChange(checked, item.id!)
                  }
                />
              </div>
            ))
          ) : (
            <div className="flex-col center bg-grayScale-50 h-[450px]">
              <img
                src="/assets/icons/milk.svg"
                alt="milk"
                className="mb-[32px]"
              />
              <span className="mb-1 h1 text-grayScale-500">텅 비어있어요</span>
              <p className="s2 text-grayScale-500">대리점을 등록해주세요.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopTable;
