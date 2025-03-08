import useModalStore from "@/stores/useModalStore";
import UploadModal from "@/components/submit/modal/UploadModal";
import ConvertModal from "@/components/submit/modal/ConvertModal";
import SuccessOCRModal from "@/components/submit/modal/SuccessOCRModal";
import FailOCRModal from "@/components/submit/modal/FailOCRModal";
import EditModal from "@/components/submit/modal/EditModal";
import CheckModal from "@/components/submit/modal/CheckModal";
import SubmitHeader from "@/components/submit/SubmitHeader";
import SubmitTable from "@/components/submit/SubmitTable";
import Pagination from "@/components/common/control/Pagination";
import SuccessModal from "@/components/common/modal/SuccessModal";
import { useEffect } from "react";
import { getNtsTax } from "@/api/ntsTax";

const SubmitPage = () => {
  const {
    isUploadOpen,
    isConvertOpen,
    isSuccessOpen,
    isFailOpen,
    isEditOpen,
    isSaveCheckOpen,
    isSuccessSubmit,
  } = useModalStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNtsTax(0);

      if (data) {
        console.log(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative flex flex-col items-center w-full h-full gap-4 bg-grayScale-25">
      <SubmitHeader total={5} />
      <SubmitTable />
      <Pagination totalPage={12} />
      {isUploadOpen && <UploadModal />}
      {isConvertOpen && <ConvertModal />}
      {isSuccessOpen && <SuccessOCRModal />}
      {isFailOpen && <FailOCRModal />}
      {isEditOpen && <EditModal />}
      {isSaveCheckOpen && <CheckModal count={13} />}
      {isSuccessSubmit && <SuccessModal count={13} />}
    </div>
  );
};

export default SubmitPage;
