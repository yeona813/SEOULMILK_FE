import Pagination from "@/components/common/control/Pagination";
import VerifyHeader from "@/components/verify/VerifyHeader";
import VerifyTable from "@/components/verify/VerifyTable";

const VerifyPage = () => {
  return (
    <div className="flex-col w-screen h-full center">
      <div className="w-[1240px] center flex-col mt-[35px]">
        <VerifyHeader />
        <div className="mt-4">
          <VerifyTable />
        </div>
        <div className="mt-8">
          <Pagination totalPage={12} />
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
