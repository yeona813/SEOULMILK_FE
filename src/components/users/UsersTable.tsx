import { Agency, Employee } from "@/pages/UsersPage";
import { useUserPickerStore } from "@/stores/useAdminStore";
import CheckBox from "../common/control/CheckBox";
import UsersTableItem from "./UsersTableItem";
import {
  useEmployeeStore,
  useUserDrawerStore,
} from "@/stores/useSubmitDrawerStore";
import EmployeeDrawer from "./EmployeeDrawer";

interface UsersTableProps {
  data: Employee[] | Agency[];
  checkedItem: number[];
  setCheckedItem: React.Dispatch<React.SetStateAction<number[]>>;
  isAllChecked: boolean;
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsersTable = ({
  data,
  checkedItem,
  setCheckedItem,
  isAllChecked,
  setIsAllChecked,
}: UsersTableProps) => {
  const { currentPick } = useUserPickerStore();
  const { setSelectedItem } = useEmployeeStore();
  const { isUserDrawerOpen, openUserDrawer } = useUserDrawerStore();

  const handleItemClick = (item: Employee) => {
    setSelectedItem(item);
    openUserDrawer();
  };

  const handleCheckChange = (checked: boolean, id: number) => {
    setCheckedItem((prev) =>
      checked ? [...prev, id] : prev.filter((id) => id !== id)
    );
  };

  const handleAllCheckChange = (checked: boolean) => {
    if (checked) {
      setCheckedItem(data.map((item) => item.id!));
      setIsAllChecked(true);
    } else {
      setCheckedItem([]);
      setIsAllChecked(false);
    }
  };

  return (
    <>
      <div className="w-[1240px] 3xl:w-[1560px] max-h-[597px] h-fit 3xl:max-h-[664px] 3xl:h-fit border border-solid border-grayScale-200 rounded bg-white overflow-y-auto overflow-x-hidden mb-[49px]">
        <div className="sticky top-0 flex flex-wrap h-10 text-left bg-white border-b border-solid border-grayScale-200 b5 text-grayScale-500">
          {/* 헤더 */}
          <div className="w-[34px] ml-[15px] flex items-center">
            <CheckBox
              checked={isAllChecked}
              onChange={(e) => handleAllCheckChange(e.target.checked)}
            />
          </div>
          <div className="w-[118px] 3xl:w-[200px] flex items-center">번호</div>
          <div className="w-[336px] 3xl:w-[400px] flex items-center">
            {currentPick === "EMPLOYEE" ? "이름" : "대리점명"}
          </div>
          <div className="w-[300px] 3xl:w-[400px] flex items-center">
            {currentPick === "EMPLOYEE" ? "사번(아이디)" : "아이디"}
          </div>
          <div className="w-[310px] 3xl:w-[400px] flex items-center">
            이메일
          </div>
          <div className="w-[61px] flex items-center text-center">
            담당대리점
          </div>
        </div>
        <div>
          {/* 테이블 항목 반복 */}
          {data.length > 0 ? (
            data.map((item) => {
              const isEmployee = currentPick === "EMPLOYEE";

              return (
                <div
                  className="w-[1220px] 3xl:w-[1560px] mb-[6px]"
                  key={item.id}
                >
                  <UsersTableItem
                    check={checkedItem.includes(item.id)}
                    number={item.id}
                    name={
                      isEmployee
                        ? (item as Employee).name
                        : (item as Agency).agencyName
                    }
                    id={
                      isEmployee
                        ? (item as Employee).employeeNum
                        : (item as Agency).agencyId
                    }
                    email={item.email}
                    agency={
                      isEmployee
                        ? `${(item as Employee).agencyNum}건`
                        : (item as Agency).status
                    }
                    onCheckChange={(checked) =>
                      handleCheckChange(checked, item.id)
                    }
                    onClick={() => {
                      if (currentPick === "EMPLOYEE") {
                        handleItemClick(item as Employee);
                      }
                    }}
                  />
                </div>
              );
            })
          ) : (
            <div className="flex-col center bg-grayScale-50 h-[450px]">
              <img
                src="/assets/icons/milk.svg"
                alt="milk"
                className="mb-[32px]"
              />
              <span className="mb-1 h1 text-grayScale-500">텅 비어있어요</span>
              <p className="s2 text-grayScale-500">계산서를 업로드해주세요.</p>
            </div>
          )}
        </div>
      </div>
      {isUserDrawerOpen && <EmployeeDrawer />}
    </>
  );
};

export default UsersTable;
