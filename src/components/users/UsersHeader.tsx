import Button from "../common/button/Button";
import RequestPicker from "../common/control/RequestPicker";

interface UserHeaderProps {
  checkedItem: number[];
}

const UsersHeader = ({ checkedItem }: UserHeaderProps) => {
  return (
    <div className="w-[1240px] 3xl:w-[1560px] mt-[37px]">
      <h1 className="flex justify-start h1 text-grayScale-900">
        사용자 목록 관리
      </h1>
      <div className="flex items-end justify-between w-full mt-[6px]">
        <RequestPicker />
        <div className="flex items-end gap-2">
          <p className="b4 text-secondary-300">
            * 담당 배리점 배정 및 확인은 상세페이지에서 가능합니다.
          </p>
          <div className="w-[120px]">
            <Button
              color="green"
              size="medium"
              disabled={checkedItem.length === 0}
            >
              삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersHeader;
