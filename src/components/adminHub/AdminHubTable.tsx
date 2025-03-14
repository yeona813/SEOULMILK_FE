import CheckBox from "../common/control/CheckBox";
import SubmitTableItem from "../submit/SubmitTableltem";
import { NtsTax } from "@/types/ntsTax";
import Tag from "../common/notification/Tag";
import { useSubmitInvoiceStore } from "@/stores/useSubmitDrawerStore";
import { useAdminPickerStore } from "@/stores/useAdminStore";

interface AdminHubTablelProps {
  data: NtsTax[];
  checkedItem: number[];
  setCheckedItem: React.Dispatch<React.SetStateAction<number[]>>;
  totalCount: number;
  correctCount: number;
  inCorrectCount: number;
  isAllChecked: boolean;
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
  openInfo: boolean;
  setOpenInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminHubTable = ({
  data,
  checkedItem,
  setCheckedItem,
  totalCount,
  correctCount,
  inCorrectCount,
  isAllChecked,
  setIsAllChecked,
  openInfo,
  setOpenInfo,
}: AdminHubTablelProps) => {
  const { currentStatus } = useAdminPickerStore();
  const { setSelectedItem } = useSubmitInvoiceStore();

  const handleItemClick = (item: NtsTax) => {
    setSelectedItem(item);
  };

  const handleCheckChange = (checked: boolean, ntsTaxId: number) => {
    setCheckedItem((prev) =>
      checked ? [...prev, ntsTaxId] : prev.filter((id) => id !== ntsTaxId)
    );
  };

  const handleAllCheckChange = (checked: boolean) => {
    if (checked) {
      setCheckedItem(data.map((item) => item.ntsTaxId!));
      setIsAllChecked(true);
      setOpenInfo(true);
    } else {
      setCheckedItem([]);
      setIsAllChecked(false);
      setOpenInfo(false);
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
            공급자
          </div>
          <div className="w-[300px] 3xl:w-[400px] flex items-center">
            공급 받는자
          </div>
          <div className="w-[174px] 3xl:w-[250px] flex items-center">
            작성일자
          </div>
          <div className="w-[164px] 3xl:w-[180px] flex items-center">
            공급가액
          </div>
          <div className="w-[61px] flex items-center text-center">
            검증 결과
          </div>
        </div>
        <div>
          {/* 테이블 항목 반복 */}

          {data && data.length > 0 ? (
            data.map((item) => (
              <div
                className="w-[1220x] 3xl:w-[1560px] mb-[6px]"
                key={item.ntsTaxId}
              >
                <SubmitTableItem
                  check={checkedItem.includes(item.ntsTaxId!)}
                  number={item.ntsTaxId!}
                  supplier={item.suName}
                  retailer={item.ipName}
                  date={item.issueDate}
                  amount={item.grandTotal}
                  validationResult={item.status === "APPROVAL"}
                  onCheckChange={(checked) =>
                    handleCheckChange(checked, item.ntsTaxId!)
                  }
                  onClick={() => handleItemClick(item)}
                />
              </div>
            ))
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

      {openInfo && (
        <div className="left-1/2 translate-x-[-50%] translate-y-[-50%] absolute top-[55px] px-5 py-2 border border-secondary-300 bg-white flex rounded-xl shadow-lg w-[573px] gap-[6px] items-center">
          <img src="/assets/icons/info.svg" alt="info" />
          {isAllChecked ? (
            <div className="flex justify-between w-full b3 text-grayScale-700">
              <div className="flex gap-[2px]">
                전체 페이지에 있는 항목
                <Tag
                  text={
                    currentStatus === undefined
                      ? `${totalCount}건`
                      : currentStatus === "APPROVAL"
                        ? `${correctCount}건`
                        : `${inCorrectCount}건`
                  }
                />
                이 모두 선택되었습니다.
              </div>
              <p
                className="border-b text-secondary-500 b3 border-b-secondary-500"
                onClick={() => setIsAllChecked(false)}
              >
                선택 취소
              </p>
            </div>
          ) : (
            <div className="flex justify-between w-full b3 text-grayScale-700">
              <div className="flex gap-[2px]">
                이 페이지에 있는 항목
                <Tag text="13건" />만 선택되었습니다.
              </div>
              <p
                className="border-b text-secondary-500 b3 border-b-secondary-500"
                onClick={() => setIsAllChecked(true)}
              >
                전체
                {currentStatus === undefined
                  ? `${totalCount}건`
                  : currentStatus === "APPROVAL"
                    ? `${correctCount}건`
                    : `${inCorrectCount}건`}
                모두 선택
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AdminHubTable;
