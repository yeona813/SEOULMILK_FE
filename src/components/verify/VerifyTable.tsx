import { useState } from "react";
import CheckBox from "../common/control/CheckBox";
import VerifyTableItem from "./VerifyTableItem";

// 테스트 데이터 배열
const tableData = [
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
    <div className="w-[1240px] h-[644px]  border border-solid border-grayScale-200 rounded">
      <div className="flex flex-wrap h-10 text-left border-b border-solid border-grayScale-200 b5 text-grayScale-500">
        {/* 헤더 */}
        <div className="w-[34px] ml-[15px] flex items-center">
          <CheckBox
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
        </div>
        <div className="w-[39px]  flex items-center">순번</div>
        <div className="min-w-[79px] flex items-center "></div>
        <div className="w-[336px]  flex items-center">공급자</div>
        <div className="w-[336px]  flex items-center">공급 받는자</div>
        <div className="w-[174px]  flex items-center">작성일자</div>
        <div className="w-[164px]  flex items-center">공급가액</div>
        <div className="w-[61px]   flex items-center text-center">검증결과</div>
      </div>
      <div>
        {/* 테이블 항목 반복 */}
        <div className="w-[1238px]">
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
              onCheckChange={(checked) => handleItemCheck(index, checked)} // 항목 체크 변경 처리
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerifyTable;
