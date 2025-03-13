import { getAgencyList, getEmployeeList } from "@/api/admin";
import Pagination from "@/components/common/control/Pagination";
import UsersHeader from "@/components/users/UsersHeader";
import UsersTable from "@/components/users/UsersTable";
import { useUserPickerStore } from "@/stores/useAdminStore";
import { useUserDrawerStore } from "@/stores/useSubmitDrawerStore";
import { useEffect, useState } from "react";

export interface Employee {
  id: number;
  name: string;
  employeeNum: string;
  email: string;
  agencyNum: number;
}

export interface Agency {
  id: number;
  agencyName: string;
  agencyId: string;
  email: string;
  status: string;
}

interface EmployeeList {
  agencyList: Employee[] | Agency[];
  listSize: number;
  totalPage: number;
  totalElements: number;
}

const UsersPage = () => {
  const [data, setData] = useState<EmployeeList | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItem, setCheckedItem] = useState<number[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const { currentPick } = useUserPickerStore();
  const { isUserDrawerOpen } = useUserDrawerStore();

  const fetchData = async () => {
    if (currentPick === "EMPLOYEE") {
      const response = await getEmployeeList(currentPage - 1);
      if (response) {
        setData(response);
      }
    } else {
      const response = await getAgencyList(currentPage - 1);
      if (response) {
        setData(response);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, currentPick, isUserDrawerOpen]);

  return (
    <div className="relative flex flex-col items-center w-full h-full gap-4 bg-grayScale-25">
      <UsersHeader checkedItem={checkedItem} />
      {data ? (
        <UsersTable
          data={data?.agencyList ?? []}
          checkedItem={checkedItem}
          setCheckedItem={setCheckedItem}
          isAllChecked={isAllChecked}
          setIsAllChecked={setIsAllChecked}
        />
      ) : (
        <p>데이터 없음</p>
      )}
      <Pagination
        totalPage={data?.totalPage || 0}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UsersPage;
