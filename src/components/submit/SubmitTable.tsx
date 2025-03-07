import { useState } from "react";
import CheckBox from "../common/control/CheckBox";
import SubmitTableItem from "./SubmitTableItem";

// 테스트 데이터 배열
const tableData = [
  {
    number: 1,
    supplier: "서울우유 대전 대리점",
    retailer: "부산 중구 갈매기 마트 서면점",
    date: "2025.02.25",
    amount: 9965000,
  },
  {
    number: 2,
    supplier: "롯데마트 서울역점",
    retailer: "인천 미추홀구 청라 마트",
    date: "2025.02.26",
    amount: 12875000,
  },
  {
    number: 3,
    supplier: "GS25 서울 강남역점",
    retailer: "대구 북구 하이마트",
    date: "2025.02.27",
    amount: 7450000,
  },
  {
    number: 4,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
  },
  {
    number: 5,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
  },
  {
    number: 6,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
  },
  {
    number: 7,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
  },
  {
    number: 8,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
  },
  {
    number: 9,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
  },
  {
    number: 10,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
  },
  {
    number: 11,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
  },
  {
    number: 12,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
  },
  {
    number: 13,
    supplier: "CU 동대문점",
    retailer: "광주 서구 푸드마트",
    date: "2025.02.28",
    amount: 8900000,
  },
];

const SubmitTable = () => {
  const [selectAll, setSelectAll] = useState<boolean>(false); // 전체 체크박스 상태
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(tableData.length).fill(false)
  ); // 개별 체크박스 상태 배열

  // 전체 체크박스 클릭 시 처리 함수
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setCheckedItems(new Array(tableData.length).fill(checked)); // 모든 항목 체크/해제
  };

  // 개별 아이템 체크박스 상태 변경 함수
  const handleItemCheck = (index: number, checked: boolean) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = checked;
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <div className="relative w-[1240px] 3xl:w-[1560px] h-[597px] 3xl:h-[644px] border border-solid border-grayScale-200 rounded bg-white overflow-y-auto overflow-x-hidden mb-[49px]">
      {/* 헤더 */}
      <div className="sticky top-0 flex flex-wrap h-10 text-left bg-white border-b border-solid border-grayScale-200 b5 text-grayScale-500">
        <div className="w-[34px] ml-[15px] flex items-center">
          <CheckBox
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
        </div>
        <div className="w-[118px] 3xl:w-[200px] flex items-center">번호</div>
        <div className="w-[358px] 3xl:w-[400px] flex items-center">공급자</div>
        <div className="w-[356px] 3xl:w-[400px] first-letter: flex items-center">
          공급 받는자
        </div>
        <div className="w-[193px] 3xl:w-[250px] flex items-center">
          작성일자
        </div>
        <div className="w-[144px] 3xl:w-[200px] flex items-center">
          공급가액
        </div>
      </div>
      <div>
        {/* 테이블 항목 반복 */}
        <div className="w-[1240px] 3xl:w-[1560px]">
          {tableData.map((item, index) => (
            <SubmitTableItem
              key={index}
              check={checkedItems[index]}
              number={item.number}
              supplier={item.supplier}
              retailer={item.retailer}
              date={item.date}
              amount={item.amount}
              onCheckChange={(checked) => handleItemCheck(index, checked)} // 항목 체크 변경 처리
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmitTable;
