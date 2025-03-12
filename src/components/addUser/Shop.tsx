import { AgencyData } from "@/types/admin";
import ShopDownloadXlsx from "./ShopDownloadXlsx";
import ShopUpload from "./ShopUploader";
import ShopTable from "./ShopTable";
import { useState } from "react";

interface ShopProps {
  data: AgencyData | null;
}

const Shop = ({ data }: ShopProps) => {
  const [checkedItem, setCheckedItem] = useState<number[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  return (
    <div className="flex flex-col h-full gap-4">
      <h1 className="h1 text-grayScale-900 mb-[10px]">대리점</h1>
      <div className="flex items-end justify-between">
        <div className="flex items-center">
          <ShopDownloadXlsx />
          <span className="b3 text-grayScale-400 rounded-2xl hover:bg-grayScale-100 px-3 py-[2px] hover:text-grayScale-600">
            삭제
          </span>
        </div>
        <div className="flex items-end gap-2">
          <ShopUpload />
          <button className="px-[18px] py-2 rounded-lg bg-secondary-500 text-white b3 hover:bg-secondary-700 h-fit">
            신규등록
          </button>
          <button className="px-[22px] py-3 rounded-lg bg-grayScale-600 text-white b3 hover:bg-secondary-700">
            초대 메일 발송
          </button>
        </div>
      </div>
      {data ? (
        <ShopTable
          data={data.agencyList}
          checkedItem={checkedItem}
          setCheckedItem={setCheckedItem}
          isAllChecked={isAllChecked}
          setIsAllChecked={setIsAllChecked}
        />
      ) : (
        <p>데이터 없음</p>
      )}
    </div>
  );
};

export default Shop;
