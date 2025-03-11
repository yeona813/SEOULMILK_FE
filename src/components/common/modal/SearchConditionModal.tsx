import useModalStore from "@/stores/useModalStore";
import Modal from "./Modal";
import SearchDatePicker from "../control/SearchDatePicker";
import SearchInput from "../input/SearchInput";
import { useState } from "react";
import Button from "../button/Button";
import SearchTag from "../notification/SearchTag";

const SearchConditionModal = () => {
  const { closeSearchCondition } = useModalStore();
  const [supplier, setSupplier] = useState<string>(""); // 공급자
  const [receiver, setReceiver] = useState<string>(""); // 공급 받는자

  const handleSupplierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupplier(e.target.value);
  };
  const handleReceiverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiver(e.target.value);
  };

  return (
    <Modal onClose={closeSearchCondition}>
      <div className="flex-col p-6 flex gap-[10px] w-[493px] ">
        <h1 className="h2 text-grayScale-900 w-full text-center">
          조회 조건 설정
        </h1>
        <div className="mt-2 mb-6">
          <div className="st3 text-grayScale-600">조회 기간</div>
          <div className="flex gap-[17px] b4 text-grayScale-500">
            <div>
              <div className="mb-1">시작일</div>
              <SearchDatePicker />
            </div>
            <div className="center">~</div>
            <div>
              <div className="mb-1">종료일</div>
              <SearchDatePicker />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="st3 text-grayScale-600 mb-2">공급자</div>
          <div className="flex flex-wrap gap-2 mb-2">
            <SearchTag text="서울우유 성동구 답십리점" />
            <SearchTag text="서울우유 성동구 답십리점" />
            <SearchTag text="서울우유 성동구 답십리점" />
            <SearchTag text="서울우유 성동구 답십리점" />
            <SearchTag text="서울우유 성동구 답십리점" />
          </div>
          <SearchInput
            value={supplier}
            onChange={handleSupplierChange}
            placeholder="검색"
          />
        </div>
        <div className="mb-6">
          <div className="st3 text-grayScale-600 mb-2">공급 받는자</div>
          <div className="flex flex-wrap gap-2 mb-2">
            <SearchTag text="서울우유 성동구 답십리점" />
            <SearchTag text="서울우유 성동구 답십리점" />
            <SearchTag text="서울우유 성동구 답십리점" />
            <SearchTag text="서울우유 성동구 답십리점" />
            <SearchTag text="서울우유 성동구 답십리점" />
          </div>
          <SearchInput
            value={receiver}
            onChange={handleReceiverChange}
            placeholder="검색"
          />
        </div>
        <div>
          <div className="flex gap-[9px]">
            <div className="w-[218px] h-[50px]">
              <Button size="medium" color="gray" onClick={closeSearchCondition}>
                닫기
              </Button>
            </div>
            <div className="w-[218px] h-[50px]">
              <Button size="medium" color="green">
                <div className="exist-icon">
                  <img src="/assets/icons/lookUp.svg" />
                  조회하기
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SearchConditionModal;
