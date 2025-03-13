import {
  deleteNtsTaxIds,
  getAdminNtsTax,
  getNtsTaxCSV,
  postCheckedCSV,
} from "@/api/admin";
import AdminHubHeader from "@/components/adminHub/AdminHubHeader";
import AdminHubTable from "@/components/adminHub/AdminHubTable";
import Pagination from "@/components/common/control/Pagination";
import { downloadCSV } from "@/components/common/downloadCSV";
import SearchConditionModal from "@/components/common/modal/SearchConditionModal";
import SuccessModal from "@/components/common/modal/SuccessModal";
import CheckModal from "@/components/submit/modal/CheckModal";
import { useAdminPickerStore } from "@/stores/useAdminStore";
import useConditionSearchStore from "@/stores/useConditionSearchStore";
import useModalStore from "@/stores/useModalStore";
import { NtsTaxHubData } from "@/types/ntsTax";
import { useEffect, useState } from "react";

const AdminHubPage = () => {
  const [data, setData] = useState<NtsTaxHubData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItem, setCheckedItem] = useState<number[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const { currentStatus } = useAdminPickerStore();
  const {
    isSaveCheckOpen,
    closeSaveCheck,
    isSearchConditionOpen,
    isSuccessSubmit,
    openSuccessSubmit,
  } = useModalStore();
  const { isSearchMode, fetchSearchData } = useConditionSearchStore();
  const { startMonth, endMonth, supplierTags, recipientTags } =
    useConditionSearchStore();

  const fetchData = async () => {
    const response = await getAdminNtsTax(currentPage - 1, currentStatus);
    if (response) {
      setData(response);
    }
  };

  const handleDelete = async () => {
    try {
      const success = await deleteNtsTaxIds(checkedItem);
      if (success) {
        closeSaveCheck();
        setCheckedItem([]);
        setIsAllChecked(false);
        setOpenInfo(false);
        fetchData();
        setData((prevData) =>
          prevData
            ? {
                ...prevData,
                ntsTaxList: prevData.ntsTaxList.filter(
                  (item) => !checkedItem.includes(item.ntsTaxId!)
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
        const response = await getNtsTaxCSV(
          startMonth,
          endMonth,
          supplierTags,
          recipientTags,
          currentStatus
        );
        console.log("csv", response);
        downloadCSV(response);
      } else {
        const response = await postCheckedCSV(checkedItem);
        if (response) {
          downloadCSV(response);
          openSuccessSubmit("저장");
        }
      }
      setCheckedItem([]);
      setIsAllChecked(false);
      setOpenInfo(false);
      closeSaveCheck();
      fetchData();
    } catch (error) {
      console.error("제출 실패:", error);
      return false;
    }
  };

  useEffect(() => {
    const fetchAndSetData = async () => {
      if (!isSearchMode) fetchData();
      else {
        const data = await fetchSearchData(currentPage, "admin", currentStatus);
        if (data) {
          setData(data as NtsTaxHubData);
        }
      }
    };
    fetchAndSetData();
  }, [currentStatus, currentPage, isSearchMode]);

  return (
    <div className="relative flex flex-col items-center w-full h-full gap-4 bg-grayScale-25">
      <AdminHubHeader
        totalCount={data?.totalElements || 0}
        correctCount={data?.successElements || 0}
        inCorrectCount={data?.failedElements || 0}
        checkedItem={checkedItem}
        onSubmit={handleSubmit}
      />
      {data ? (
        <AdminHubTable
          data={data?.ntsTaxList ?? []}
          checkedItem={checkedItem}
          setCheckedItem={setCheckedItem}
          totalCount={data.totalElements}
          correctCount={data.successElements}
          inCorrectCount={data.failedElements}
          isAllChecked={isAllChecked}
          setIsAllChecked={setIsAllChecked}
          openInfo={openInfo}
          setOpenInfo={setOpenInfo}
        />
      ) : (
        <p>데이터 없음</p>
      )}
      <Pagination
        totalPage={data?.totalPage || 1}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {isSaveCheckOpen && (
        <CheckModal count={checkedItem.length} onDelete={handleDelete} />
      )}
      {isSearchConditionOpen && (
        <SearchConditionModal
          page={currentPage}
          status={currentStatus}
          userType="admin"
          setData={setData}
        />
      )}
      {isSuccessSubmit && <SuccessModal />}
    </div>
  );
};

export default AdminHubPage;
