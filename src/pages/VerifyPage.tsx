import VerifyHeader from "@/components/verify/VerifyHeader";
import Pagination from "@/components/common/control/Pagination";
import { useEffect, useState } from "react";
import { getEmployeeTax } from "@/api/employeeTax";
import { employeeTax } from "@/types/employeeTax";
import VerifyTable from "@/components/verify/VerifyTable";
import { useTaxStore } from "@/stores/useVerifyStore";
import SuccessRevalidationModal from "@/components/common/modal/SuccessRevalidationModal";
import useModalStore from "@/stores/useModalStore";

interface NtsTaxData {
  listSize: number;
  hometaxList: employeeTax[];
  successElements: number;
  totalElements: number;
  failedElements: number;
  totalPage: number;
}

const VerifyPage = () => {
  const [data, setData] = useState<NtsTaxData | null>(null);
  const currentStatus = useTaxStore((state) => state.currentStatus);
  const [currentPage, setCurrentPage] = useState(1);
  const { isSuccessRevalidationModalOpen } = useModalStore();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEmployeeTax(currentPage - 1, currentStatus);
      setData(response);

      if (response) {
        console.log(data);
      }
    };

    fetchData();
  }, [currentPage, currentStatus]);

  return (
    <div className="relative flex flex-col items-center w-full h-full gap-4 bg-grayScale-25">
      <VerifyHeader
        totalElements={data?.totalElements}
        successElements={data?.successElements}
        failedElements={data?.failedElements}
      />
      {data ? (
        <VerifyTable data={data?.hometaxList ?? []} />
      ) : (
        <p>데이터 없음</p>
      )}
      <Pagination
        totalPage={data?.totalPage || 1}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {isSuccessRevalidationModalOpen && <SuccessRevalidationModal />}
    </div>
  );
};

export default VerifyPage;
