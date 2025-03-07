import Pagination from "@/components/common/control/Pagination";
import VerifyHeader from "@/components/verify/VerifyHeader";
import VerifyTable from "@/components/verify/VerifyTable";

const VerifyPage = () => {
  return (
    <div className="flex flex-col items-center w-full h-full gap-4 bg-grayScale-25">
      <VerifyHeader />
      <VerifyTable />
      <Pagination totalPage={12} />
    </div>
  );
};

export default VerifyPage;
