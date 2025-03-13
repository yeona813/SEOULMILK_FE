import { useEffect, useState } from "react";
import CheckBox from "../common/control/CheckBox";
import VerifyTableItem from "./VerifyTableItem";
import { employeeTax } from "@/types/employeeTax";
import VerifyDrawer from "../drawer/VerifyDrawer";
import { useDrawerStore } from "@/stores/useDrawerStore";
import EmptyData from "../common/EmptyData";
import { useSelectionStore } from "@/stores/useSelectionStore";
import Tag from "../common/notification/Tag";
import { useDataTaxStore } from "@/stores/useVerifyStore";

interface SubmitTableProps {
  data: employeeTax[];
  correctCount?: number;
  inCorrectCount?: number;
}

const VerifyTable = ({
  data,
  correctCount,
  inCorrectCount,
}: SubmitTableProps) => {
  const { openVerifyDrawer, isVerifyDrawerOpen } = useDrawerStore();
  const { checkedItems, selectAll, setCheckedItems, setSelectAll } =
    useSelectionStore();
  const [selectedItem, setSelectedItem] = useState<employeeTax | null>(null);
  const { currentStatus } = useDataTaxStore();
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  useEffect(() => {
    setSelectAll(false);
    setCheckedItems([]); // 초기화
  }, [data, setCheckedItems]);

  const handleItemClick = (item: employeeTax) => {
    setSelectedItem(item);
    openVerifyDrawer();
  };

  // 전체 데이터 선택
  const handleSelectAllPage = (checked: boolean) => {
    setSelectAll(checked);
    setCheckedItems(checked ? data.map((item) => item.ntsTaxId) : []);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    const visibleIds = checked
      ? data.slice(0, 13).map((item) => item.ntsTaxId)
      : [];
    setCheckedItems(visibleIds);
  };

  const handleItemCheck = (id: number, checked: boolean) => {
    setCheckedItems((prevCheckedItems: number[]) => {
      if (checked) {
        return [...prevCheckedItems, id];
      } else {
        return prevCheckedItems.filter((item: number) => item !== id);
      }
    });
  };
  const statusCount =
    currentStatus === "APPROVAL" ? (correctCount ?? 0) : (inCorrectCount ?? 0);
  return (
    <div className=" w-[1240px] 3xl:w-[1560px] max-h-[597px] h-fit 3xl:max-h-[664px] 3xl:h-fit border border-solid border-grayScale-200 rounded bg-white overflow-y-auto overflow-x-hidden mb-[49px]">
      <div className="sticky top-0 flex flex-wrap h-10 text-left bg-white border-b border-solid border-grayScale-200 b5 text-grayScale-500">
        <div className="w-[34px] ml-[15px] flex items-center">
          <CheckBox
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
        </div>
        <div className="w-[118px] 3xl:w-[200px] flex items-center">번호</div>
        <div className="w-[336px] 3xl:w-[400px] flex items-center">공급자</div>
        <div className="w-[300px] 3xl:w-[400px] flex items-center">
          공급 받는자
        </div>
        <div className="w-[174px] 3xl:w-[250px] flex items-center">
          작성일자
        </div>
        <div className="w-[164px] 3xl:w-[180px] flex items-center">
          공급가액
        </div>
        <div className="w-[61px] flex items-center text-center">검증 결과</div>
      </div>
      <div>
        {data.length > 0 ? (
          data.map((item, index) => (
            <VerifyTableItem
              key={index}
              check={checkedItems.includes(item.ntsTaxId)}
              number={item.ntsTaxId}
              supplier={item.suName}
              retailer={item.ipName}
              date={item.issueDate}
              amount={item.grandTotal}
              validationResult={item.status === "APPROVAL"}
              onCheckChange={(checked) =>
                handleItemCheck(item.ntsTaxId, checked)
              }
              onClick={() => handleItemClick(item)}
            />
          ))
        ) : (
          <EmptyData />
        )}
      </div>
      {isVerifyDrawerOpen && selectedItem && (
        <VerifyDrawer
          suName={selectedItem.suName}
          validationResult={selectedItem.status === "APPROVAL"}
          ipName={selectedItem.ipName}
          ntsTaxId={selectedItem.ntsTaxId}
        />
      )}
      {selectAll && (
        <div className="left-1/2 translate-x-[-50%] translate-y-[-50%] absolute top-[55px] px-5 py-2 border border-secondary-300 bg-white flex rounded-xl shadow-lg w-[573px] gap-[6px] items-center">
          <img src="/assets/icons/info.svg" alt="info" />
          {isAllChecked ? (
            <div className="flex justify-between w-full b3 text-grayScale-700">
              <div className="flex gap-[2px]">
                전체 페이지에 있는 항목
                <Tag text={`${statusCount}건`} />이 모두 선택되었습니다.
              </div>
              <p
                className="border-b cursor-pointer text-secondary-500 b3 border-b-secondary-500"
                onClick={() => {
                  setIsAllChecked(false);
                  setCheckedItems([]);
                  setSelectAll(false);
                }}
              >
                선택 취소
              </p>
            </div>
          ) : (
            <div className="flex justify-between w-full b3 text-grayScale-700">
              <div className="flex gap-[2px]">
                이 페이지에 있는 항목
                <Tag
                  text={`${
                    statusCount >= 13 ? 13 : statusCount % 13 || statusCount
                  }`}
                />
                건만 선택되었습니다.
              </div>
              <p
                className="border-b cursor-pointer text-secondary-500 b3 border-b-secondary-500"
                onClick={() => {
                  setIsAllChecked(true);
                  handleSelectAllPage(true);
                }}
              >
                전체 {statusCount} 건 모두 선택
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyTable;
