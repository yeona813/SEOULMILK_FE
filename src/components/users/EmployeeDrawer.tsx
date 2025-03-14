import {
  useEmployeeStore,
  useUserDrawerStore,
} from "@/stores/useSubmitDrawerStore";
import Drawer from "../drawer/Drawer";
import Button from "../common/button/Button";
import CheckBox from "../common/control/CheckBox";
import { useEffect, useState } from "react";
import { getEmployee, getEmployeeAgency, postAssignAgency } from "@/api/admin";

interface Agency {
  id: number;
  name: string;
}

const EmployeeDrawer = () => {
  const { closeUserDrawer } = useUserDrawerStore();
  const { selectedItem } = useEmployeeStore();
  const [data, setData] = useState<Agency[]>([]);
  const [employee, SetEmployee] = useState<Agency[]>([]);
  const [checkedItem, setCheckedItem] = useState<number[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedItem) {
        const response = await getEmployeeAgency(selectedItem?.id);
        const employee = await getEmployee(selectedItem.id);
        if (response) {
          setData(response);
        }
        if (employee) {
          console.log(employee);
          SetEmployee(employee);
        }
      }
    };
    fetchData();
  }, []);

  const handleCheckChange = (checked: boolean, id: number) => {
    setCheckedItem((prev) =>
      checked ? [...prev, id] : prev.filter((prevId) => prevId !== id)
    );
  };

  const handleAllCheckChange = (checked: boolean) => {
    if (checked && data) {
      setCheckedItem(data.map((item) => item.id));
      setIsAllChecked(true);
    } else {
      setCheckedItem([]);
      setIsAllChecked(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedItem) {
      const success = await postAssignAgency(selectedItem.id, checkedItem);

      if (success) {
        closeUserDrawer();
      }
    }
  };

  return (
    <Drawer onClose={closeUserDrawer}>
      <div className="flex-col h-screen flex pt-[51px] pb-6 w-fit justify-between">
        <div>
          <div className="flex gap-1 px-3 py-1 st3 text-secondary-500 rounded-[26px] bg-secondary-25 w-fit mb-4">
            <img src="/assets/icons/user.svg" alt="user" />
            {selectedItem?.name}
          </div>
          <div className="flex flex-col gap-2 p-6 rounded-2xl bg-grayScale-25 mb-[14px]">
            <div className="flex gap-[46px] items-center">
              <span className="st3 text-grayScale-700 w-[92px]">
                사번(아이디)
              </span>
              <p className="text-gray-600 st4">{selectedItem?.employeeNum}</p>
            </div>
            <div className="flex gap-[46px] items-center">
              <span className="st3 text-grayScale-700 w-[92px]">이메일</span>
              <p className="text-gray-600 st4">{selectedItem?.email}</p>
            </div>
          </div>
          <div className="flex flex-col p-6 rounded-2xl bg-grayScale-25">
            <span className="st3 text-grayScale-900 mb-[5px]">
              담당 대리점 목록
            </span>
            <div className="flex items-center justify-between">
              <p
                className={`mb-3 cursor-pointer b3 text-grayScale-500 hover:text-grayScale-600`}
                onClick={() => setIsShow(true)}
              >
                현재 등록된 담당 대리점{" "}
                <span className="b2 text-secondary-300">
                  {selectedItem?.agencyNum}개
                </span>
              </p>
              <p
                className={`mb-3 cursor-pointer b3 text-grayScale-500 hover:text-grayScale-600`}
                onClick={() => setIsShow(false)}
              >
                추가
              </p>
            </div>
            <div className="flex flex-col border rounded-lg border-grayScale-200">
              {isShow ? (
                <div className="flex items-center px-4 py-2">
                  <span className="rounded-lg st3 text-grayScale-900">
                    대리점명
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2">
                  <CheckBox
                    checked={isAllChecked}
                    onChange={(e) => handleAllCheckChange(e.target.checked)}
                  />
                  <span className="rounded-lg st3 text-grayScale-900">
                    대리점명
                  </span>
                </div>
              )}

              <div className="flex flex-col items-center gap-2 p-2 bg-white rounded-lg max-h-[210px] overflow-auto">
                {isShow ? (
                  employee && employee.length > 0 ? (
                    employee.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center w-full px-2 py-1"
                      >
                        <p className="st4 text-grayScale-600">{item.name}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-grayScale-500">데이터가 없습니다.</p>
                  )
                ) : data && data.length > 0 ? (
                  data.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center w-full gap-2 px-2 py-1"
                    >
                      <CheckBox
                        checked={checkedItem.includes(item.id)}
                        onChange={(e) =>
                          handleCheckChange(e.target.checked, item.id)
                        }
                      />
                      <p className="st4 text-grayScale-600">{item.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-grayScale-500">데이터가 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[422px]">
          <Button
            color="green"
            size="large"
            disabled={checkedItem.length === 0 || isShow}
            onClick={handleSubmit}
          >
            저장
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default EmployeeDrawer;
