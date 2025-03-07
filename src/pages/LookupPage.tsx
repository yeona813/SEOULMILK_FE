import Pagination from "@/components/common/control/Pagination";
import SuccessModal from "@/components/common/modal/SuccessModal";
import LookupHeader from "@/components/lookup/LookupHeader";
import SubmitTable from "@/components/submit/SubmitTable";
import useModalStore from "@/stores/useModalStore";

const LookupPage = () => {
  const { isSuccessSubmit } = useModalStore();

  return (
    <div className="flex flex-col items-center w-full h-full gap-4 bg-grayScale-25">
      <LookupHeader total={5} />
      <SubmitTable />
      <Pagination totalPage={12} />

      {isSuccessSubmit && <SuccessModal count={13} />}
    </div>
  );
};

export default LookupPage;
