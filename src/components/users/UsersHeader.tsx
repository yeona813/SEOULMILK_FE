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
        <div className="w-[120px]">
          <Button
            size="medium"
            color="green"
            disabled={checkedItem.length === 0}
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UsersHeader;
