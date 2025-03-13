import Pagination from "@/components/common/control/Pagination";
import { useEffect } from "react";
import { HomeNtsTaxData, useDataTaxStore } from "@/stores/useVerifyStore";
import SuccessRevalidationModal from "@/components/common/modal/SuccessRevalidationModal";
import useModalStore from "@/stores/useModalStore";
import SearchConditionModal from "@/components/common/modal/SearchConditionModal";
import useConditionSearchStore from "@/stores/useConditionSearchStore";
import EmployeeLookupHeader from "@/components/employeeLookup/EmployeeLookupHeader";
import EmployeeLookupTable from "@/components/employeeLookup/EmployeeLookupTable";
import SuccessModal from "@/components/common/modal/SuccessModal";

const EmployeeLookupPage = () => {
  const { data, fetchAllData, currentStatus, currentPage, setCurrentPage } =
    useDataTaxStore();
  const {
    isSuccessSubmit,
    isSuccessRevalidationModalOpen,
    isSearchConditionOpen,
  } = useModalStore();
  const { isSearchMode, fetchSearchData } = useConditionSearchStore();

  useEffect(() => {
    setCurrentPage(1);
  }, [setCurrentPage]);

  useEffect(() => {
    const fetchAndSetData = async () => {
      if (!isSearchMode) fetchAllData(currentPage, currentStatus);
      else {
        const data = await fetchSearchData(
          currentPage,
          "employee",
          currentStatus
        );
        useDataTaxStore.getState().setData(data as HomeNtsTaxData);
      }
    };
    fetchAndSetData();
  }, [currentPage, currentStatus, fetchAllData, isSearchMode, fetchSearchData]);

  return (
    <div className="relative flex flex-col items-center w-full h-full gap-4 bg-grayScale-25">
      <EmployeeLookupHeader
        totalElements={data?.totalElements}
        successElements={data?.successElements}
        failedElements={data?.failedElements}
      />
      {data ? (
        <EmployeeLookupTable
          data={data.hometaxList ?? []}
          correctCount={data?.successElements}
          inCorrectCount={data?.failedElements}
        />
      ) : (
        <EmployeeLookupTable data={[]} />
      )}
      <Pagination
        totalPage={data?.totalPage || 1}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {isSuccessRevalidationModalOpen && <SuccessRevalidationModal />}
      {isSearchConditionOpen && (
        <SearchConditionModal
          page={currentPage}
          status={currentStatus}
          userType="employee"
        />
      )}
      {isSuccessSubmit && <SuccessModal />}
    </div>
  );
};

export default EmployeeLookupPage;
