import { AgencyData } from "@/types/admin";
import ShopDownloadXlsx from "./ShopDownloadXlsx";
import ShopUpload from "./ShopUploader";
import ShopTable from "./ShopTable";
import { useState } from "react";
import { postInviteAgency } from "@/api/admin";
import useModalStore from "@/stores/useModalStore";
import SuccessTextModal from "../common/modal/SuccessTextModal";

interface ShopProps {
  data: AgencyData | null;
}

const Shop = ({ data }: ShopProps) => {
  const [checkedItem, setCheckedItem] = useState<number[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const { openSuccessText, isSuccessText } = useModalStore();

  const handleClick = async () => {
    try {
      const success = await postInviteAgency(checkedItem);
      if (success) {
        openSuccessText("전송");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCheckedItem([]);
      setIsAllChecked(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <h1 className="h1 text-grayScale-900">대리점</h1>
      <div className="flex items-end justify-between">
        <div className="flex items-center">
          <ShopDownloadXlsx />
          <span className="b3 text-grayScale-400 rounded-2xl hover:bg-grayScale-100 px-3 py-[2px] hover:text-grayScale-600">
            삭제
          </span>
        </div>
        <div className="flex items-end gap-2">
          <ShopUpload />

          <button
            className={`px-[22px] py-3 rounded-lg text-white b3 ${
              checkedItem.length === 0
                ? "bg-grayScale-400 text-grayScale-300 cursor-not-allowed"
                : "bg-grayScale-600 hover:bg-grayScale-700"
            }`}
            disabled={checkedItem.length === 0}
            onClick={handleClick}
          >
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
      {isSuccessText && <SuccessTextModal count={checkedItem.length} />}
    </div>
  );
};

export default Shop;
