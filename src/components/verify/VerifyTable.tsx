import { useState } from "react";
import CheckBox from "../common/control/CheckBox";
import VerifyTableItem from "./VerifyTableItem";
import VerifyDrawer from "./VerifyDrawer";

interface ItemData {
  number: number;
  supplier: string;
  retailer: string;
  date: string;
  amount: number;
  validationResult: boolean;
  newly: boolean;
}

const tableData: ItemData[] = [
  {
    number: 1,
    supplier: "서울우유 대전 대리점",
    retailer: "부산 중구 갈매기 마트 서면점",
    date: "2025.02.25",
    amount: 9965000,
    validationResult: true,
    newly: true,
  },
  {
    number: 2,
    supplier: "롯데마트 서울역점",
    retailer: "인천 미추홀구 청라 마트",
    date: "2025.02.26",
    amount: 12875000,
    validationResult: false,
    newly: false,
  },
  {
    number: 3,
    supplier: "GS25 서울 강남역점",
    retailer: "대구 북구 하이마트",
    date: "2025.02.27",
    amount: 7450000,
    validationResult: true,
    newly: true,
  },
  {
    number: 4,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
    validationResult: false,
    newly: false,
  },
  {
    number: 4,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
    validationResult: false,
    newly: false,
  },
  {
    number: 4,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
    validationResult: false,
    newly: false,
  },
  {
    number: 4,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
    validationResult: false,
    newly: false,
  },
  {
    number: 4,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
    validationResult: false,
    newly: false,
  },
  {
    number: 4,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
    validationResult: false,
    newly: false,
  },
  {
    number: 4,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
    validationResult: false,
    newly: false,
  },
  {
    number: 4,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
    validationResult: false,
    newly: false,
  },
  {
    number: 4,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
    validationResult: false,
    newly: false,
  },
  {
    number: 4,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
    validationResult: false,
    newly: false,
  },
];

const VerifyTable = () => {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(tableData.length).fill(false)
  );
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleItemClick = (item: ItemData) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setCheckedItems(new Array(tableData.length).fill(checked));
  };

  const handleItemCheck = (index: number, checked: boolean) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = checked;
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <div className="relative w-[1240px] 3xl:w-[1560px] h-[597px] 3xl:h-[644px] border border-solid border-grayScale-200 rounded bg-white overflow-y-auto overflow-x-hidden mb-[49px]">
      <div className="sticky top-0 flex flex-wrap h-10 text-left bg-white border-b border-solid border-grayScale-200 b5 text-grayScale-500">
        {/* 헤더 */}
        <div className="w-[34px] ml-[15px] flex items-center">
          <CheckBox
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
        </div>
        <div className="w-[39px] 3xl:w-[50px] flex items-center">번호</div>
        <div className="min-w-[79px] flex items-center "></div>
        <div className="w-[336px] 3xl:w-[400px] flex items-center">공급자</div>
        <div className="w-[300px] 3xl:w-[400px] flex items-center">
          공급 받는자
        </div>
        <div className="w-[174px] 3xl:w-[250px] flex items-center">
          작성일자
        </div>
        <div className="w-[164px] 3xl:w-[250px] flex items-center">
          공급가액
        </div>
        <div className="w-[61px] flex items-center text-center">검증결과</div>
      </div>
      <div>
        {/* 테이블 항목 반복 */}
        <div className="w-[1220x] 3xl:w-[1560px]">
          {tableData.map((item, index) => (
            <VerifyTableItem
              key={index}
              check={checkedItems[index]}
              newly={item.newly}
              number={item.number}
              supplier={item.supplier}
              retailer={item.retailer}
              date={item.date}
              amount={item.amount}
              validationResult={item.validationResult}
              onCheckChange={(checked) => handleItemCheck(index, checked)}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>
      </div>
      <VerifyDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        data={selectedItem}
      />
    </div>
  );
};

export default VerifyTable;
