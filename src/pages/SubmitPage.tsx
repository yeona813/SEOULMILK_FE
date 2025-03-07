import useModalStore from "@/stores/useModalStore";
import UploadModal from "@/components/submit/modal/UploadModal";
import ConvertProcessingModal from "@/components/submit/modal/ConverProcessingModal";
import ConvertModal from "@/components/submit/modal/ConvertModal";
import SuccessOCRModal from "@/components/submit/modal/SuccessOCRModal";
import FailOCRModal from "@/components/submit/modal/FailOCRModal";
import EditModal from "@/components/submit/modal/EditModal";
import CheckModal from "@/components/submit/modal/CheckModal";
import SubmitHeader from "@/components/submit/SubmitHeader";
import SubmitTable from "@/components/submit/SubmitTable";
import Pagination from "@/components/common/control/Pagination";
import SuccessModal from "@/components/common/modal/SuccessModal";

const MockSuccess = [
  "oo대리점_202520227.pdf",
  "oo대리점_2025202217.pdf",
  "oo대리점_2025202227.pdf",
  "oo대리점_2025202237.pdf",
  "oo대리점_2025202247.pdf",
  "oo대리점_2025202257.pdf",
];

const failFile = {
  "oo대리점_202123.png": {
    승인번호: "",
    전자세금계산서작성일자: "2024.06.30",
    공급자사업등록번호: "306-28-70320",
    공급받는자사업등록번호: "",
    총공급가액합계: "26,323,542",
    총세액합계: "2,195,800",
    합계금액: "",
    공급자: "서울우유 대전 중곡점",
    공급받는자: "",
  },
  "oo대리점_202520227.png": {
    승인번호: "654321",
    전자세금계산서작성일자: "",
    공급자사업등록번호: "",
    공급받는자사업등록번호: "123-45-67890",
    총공급가액합계: "",
    총세액합계: "",
    합계금액: "12,345,678",
    공급자: "",
    공급받는자: "홍길동",
  },
};

const SubmitPage = () => {
  const {
    isUploadOpen,
    isProcessingOpen,
    isConvertOpen,
    isSuccessOpen,
    isFailOpen,
    isEditOpen,
    isSaveCheckOpen,
    isSuccessSubmit,
  } = useModalStore();

  return (
    <div className="flex flex-col items-center w-full h-full gap-4 bg-grayScale-25">
      <SubmitHeader total={5} />
      <SubmitTable />
      <Pagination totalPage={12} />
      {isUploadOpen && <UploadModal />}
      {isProcessingOpen && <ConvertProcessingModal />}
      {isConvertOpen && <ConvertModal />}
      {isSuccessOpen && <SuccessOCRModal successFile={MockSuccess} />}
      {isFailOpen && <FailOCRModal failFile={MockSuccess} />}
      {isEditOpen && <EditModal totalFailFile={7} failFile={failFile} />}
      {isSaveCheckOpen && <CheckModal count={13} />}
      {isSuccessSubmit && <SuccessModal count={13} />}
    </div>
  );
};

export default SubmitPage;
