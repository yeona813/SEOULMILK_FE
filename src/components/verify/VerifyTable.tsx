import {  useState } from "react";
import CheckBox from "../common/control/CheckBox";
import VerifyTableItem from "./VerifyTableItem";
import { employeeTax } from "@/types/employeeTax";
import VerifyDrawer from "../drawer/VerifyDrawer";
import { useDrawerStore } from "@/stores/useDrawerStore";

interface SubmitTableProps {
  data: employeeTax[];
}

const VerifyTable = ({ data }: SubmitTableProps) => {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(data.length).fill(false)
  );
  const { openVerifyDrawer, isVerifyDrawerOpen } = useDrawerStore();
  const [selectedItem, setSelectedItem] = useState<employeeTax | null>(null);

  const handleItemClick = (item: employeeTax) => {
    setSelectedItem(item);
    openVerifyDrawer();
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setCheckedItems(new Array(data.length).fill(checked));
  };

  const handleItemCheck = (index: number, checked: boolean) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = checked;
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <div className="relative w-[1240px] 3xl:w-[1560px] max-h-[597px] h-fit 3xl:max-h-[664px] 3xl:h-fit border border-solid border-grayScale-200 rounded bg-white overflow-y-auto overflow-x-hidden mb-[49px]">
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
        {data.map((item, index) => (
          <VerifyTableItem
            key={index}
            check={checkedItems[index]}
            number={item.ntsTaxId}
            supplier={item.suName}
            retailer={item.ipName}
            date={item.issueDate}
            amount={item.grandTotal}
            validationResult={item.status === "APPROVAL"}
            onCheckChange={(checked) => handleItemCheck(index, checked)}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
      {isVerifyDrawerOpen && selectedItem && (
        <VerifyDrawer
          suName={selectedItem.suName}
          validationResult={selectedItem.status === "APPROVAL"}
          ipName={selectedItem.ipName}
          ntsTaxId={selectedItem.ntsTaxId}
        />
      )}
    </div>
  );
};

export default VerifyTable;
