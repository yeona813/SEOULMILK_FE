import Pagination from "@/components/common/control/Pagination";
import SuccessModal from "@/components/common/modal/SuccessModal";
import LookupHeader from "@/components/lookup/LookupHeader";
import SubmitTable from "@/components/submit/SubmitTable";
import useModalStore from "@/stores/useModalStore";

const LookupPage = () => {
  const { isSuccessSubmit } = useModalStore();

  return (
    <div className="flex-col w-screen h-full center">
      <div className="w-[1240px] center flex-col mt-[35px]">
        <LookupHeader total={5} />
        <div className="mt-4">
          <SubmitTable />
        </div>
        <div className="mt-8">
          <Pagination totalPage={12} />
        </div>
      </div>
      {isSuccessSubmit && <SuccessModal count={13} />}
    </div>
  );
};

export default LookupPage;
