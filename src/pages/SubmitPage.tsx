import useModalStore from "@/stores/useModalStore";
import UploadModal from "@/components/submit/modal/UploadModal";
import ConvertModal from "@/components/submit/modal/ConvertModal";
import CheckModal from "@/components/submit/modal/CheckModal";
import SubmitHeader from "@/components/submit/SubmitHeader";
import SubmitTable from "@/components/submit/SubmitTable";
import Pagination from "@/components/common/control/Pagination";
import SuccessModal from "@/components/common/modal/SuccessModal";
import { useEffect, useState } from "react";
import {
  deleteNtsTaxIds,
  getNtsTax,
  postNtsTaxSubmit,
  postNtsTaxSubmitAll,
} from "@/api/ntsTax";
import { NtsTax } from "@/types/ntsTax";

interface NtsTaxData {
  listSize: number;
  ntsTaxList: NtsTax[];
  successElements: number;
  failedElements: number;
  totalPage: number;
}

const SubmitPage = () => {
  const [data, setData] = useState<NtsTaxData | null>(null);
  const [isSuccess, setIsSuccess] = useState("SUCCESS");
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItem, setCheckedItem] = useState<number[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const {
    isUploadOpen,
    isConvertOpen,
    isSaveCheckOpen,
    isSuccessSubmit,
    closeSaveCheck,
  } = useModalStore();

  const fetchData = async () => {
    const response = await getNtsTax(currentPage - 1, isSuccess);
    setData(response);
  };

  // 테이블의 데이터 값 가져오기
  useEffect(() => {
    fetchData();
  }, [currentPage, isSuccess]);

  const handleDelete = async () => {
    try {
      const success = await deleteNtsTaxIds(checkedItem);
      if (success) {
        closeSaveCheck();
        setCheckedItem([]);
        fetchData();
        setData((prevData) =>
          prevData
            ? {
                ...prevData,
                ntsTaxList: prevData.ntsTaxList.filter(
                  (item) => !checkedItem.includes(item.ntsTaxId)
                ),
              }
            : null
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isAllChecked) {
        await postNtsTaxSubmitAll();
      } else {
        await postNtsTaxSubmit(checkedItem);
      }

      setCheckedItem([]);
      setIsAllChecked(false);
      closeSaveCheck();
      fetchData();
    } catch (error) {
      console.error("제출 실패:", error);
      return false;
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full h-full gap-4 bg-grayScale-25">
      <SubmitHeader
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
        correctCount={data?.successElements || 0}
        inCorrectCount={data?.failedElements || 0}
        checkedItem={checkedItem}
      />
      {data ? (
        <SubmitTable
          data={data?.ntsTaxList ?? []}
          checkedItem={checkedItem}
          setCheckedItem={setCheckedItem}
          correctCount={data?.successElements || 0}
          inCorrectCount={data?.failedElements || 0}
          isSuccess={isSuccess}
          isAllChecked={isAllChecked}
          setIsAllChecked={setIsAllChecked}
        />
      ) : (
        <p>데이터 없음</p>
      )}
      <Pagination
        totalPage={data?.totalPage || 1}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {isUploadOpen && <UploadModal fetchData={fetchData} />}
      {isConvertOpen && <ConvertModal />}
      {isSaveCheckOpen && (
        <CheckModal
          count={checkedItem.length}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
        />
      )}
      {isSuccessSubmit && <SuccessModal count={checkedItem.length} />}
    </div>
  );
};

export default SubmitPage;
