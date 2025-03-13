import { getAgencyList } from "@/api/admin";
import Employee from "@/components/addUser/Employee";
import Shop from "@/components/addUser/Shop";
import Pagination from "@/components/common/control/Pagination";
import useModalStore from "@/stores/useModalStore";
import { AgencyData } from "@/types/admin";
import { useEffect, useState } from "react";

const AddUserPage = () => {
  const [data, setData] = useState<AgencyData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { isSuccessText } = useModalStore();

  const fetchData = async () => {
    const response = await getAgencyList(currentPage - 1);
    if (response) {
      setData(response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, isSuccessText]);

  return (
    <div className="gap-4 bg-grayScale-25 pt-[50px] center h-full">
      <Employee />
      <Shop data={data} />
      <Pagination
        totalPage={data?.totalPage || 1}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default AddUserPage;
