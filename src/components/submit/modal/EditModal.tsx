import Button from "@/components/common/button/Button";
import ProgressBar from "@/components/common/control/ProgressBar";
import EditInput from "@/components/common/input/EditInput";
import Modal from "@/components/common/modal/Modal";
import { useEffect, useState } from "react";
import useModalStore, { OCRFile } from "@/stores/useModalStore";

// 최종 JSON에 포함될 필드만 정의
const allowedFields: (keyof OCRFile)[] = [
  "ntsTaxId",
  "issueId",
  "issueDate",
  "suId",
  "suName",
  "ipId",
  "ipName",
  "grandTotal",
  "chargeTotal",
  "taxTotal",
];

const fieldMapping: Record<keyof OCRFile, string> = {
  issueId: "승인번호",
  issueDate: "전자세금계산서 작성일자",
  suId: "공급자 사업등록번호",
  ipId: "공급받는자 사업자등록번호",
  chargeTotal: "총공급가액 합계",
  taxTotal: "총세액 합계",
  grandTotal: "합계 금액",
  suName: "공급자",
  ipName: "공급받는자",
  ntsTaxId: "세금 ID",
  agencyId: "",
  memberId: "",
  success: "false",
  imageUrl: "",
};

const EditModal = () => {
  const { closeEdit, ocrData } = useModalStore();
  const [selectedFile, setSelectedFile] = useState<number | null>(null);
  const [failFile, setFailFile] = useState<OCRFile[] | null>(null);
  const [formData, setFormData] = useState<Partial<OCRFile>>({});

  useEffect(() => {
    if (ocrData) {
      setFailFile(ocrData.ocrNtsTaxList);
    }
  }, [ocrData]);

  useEffect(() => {
    if (selectedFile !== null) {
      const selectedData = failFile?.find(
        (file) => file.ntsTaxId === selectedFile
      );
      if (selectedData) {
        // allowedFields에 해당하는 데이터만 초기값으로 설정
        const filteredData = Object.fromEntries(
          Object.entries(selectedData).filter(([key]) =>
            allowedFields.includes(key as keyof OCRFile)
          )
        );
        setFormData(filteredData as Partial<OCRFile>);
      } else {
        setFormData({});
      }
    }
  }, [selectedFile]);

  const handleChange = (key: keyof OCRFile, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSubmit = async () => {
    // allowedFields에 해당하는 데이터만 제출
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([key]) =>
        allowedFields.includes(key as keyof OCRFile)
      )
    );

    console.log("최종 제출 데이터:", filteredData);
    closeEdit();
  };

  const displayFields = allowedFields.filter((field) => field !== "ntsTaxId");

  return (
    <Modal>
      <div className="center flex-col w-[1028px] gap-6">
        <div className="flex w-full gap-3">
          <div className="flex flex-col items-center">
            <ProgressBar currentNumber={4} />
            <span className="mt-10 h2 text-grayScale-900">
              사진을 보고 누락 내용을 직접 입력해주세요
            </span>
            <p className="flex justify-end w-full st4 text-grayScale-400">
              <span className="st3 text-grayScale-700">
                {ocrData?.failedCnt}
              </span>
              /{ocrData?.failedCnt}건
            </p>
            <div className="w-[600px] h-[373px] rounded-lg border border-grayScale-200 bg-grayScale-25 mt-2">
              사진
            </div>
          </div>

          <div className="flex flex-col w-full gap-1">
            {/* 파일 목록 렌더링 */}
            <div className="flex flex-col p-[6px] w-full h-[128px] overflow-y-auto gap-1 rounded-lg border border-grayScale-200 mb-[6px] mt-5">
              {ocrData?.ocrNtsTaxList.map((item) => (
                <div
                  key={item.ntsTaxId}
                  className={`flex items-center justify-between py-[6px] px-2 rounded-[5px] ${
                    selectedFile === item.ntsTaxId
                      ? "bg-secondary-25"
                      : "hover:bg-grayScale-50"
                  } cursor-pointer`}
                  onClick={() => setSelectedFile(item.ntsTaxId)}
                >
                  <div className="flex gap-2">
                    <img src="/assets/icons/fail.svg" alt="fail" />
                    <p className="b5 text-grayScale-700">{item.issueDate}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="b6 text-secondary-500">
              *상위 5개 항목은 홈택스로 검증할 필수데이터입니다.
            </p>

            {selectedFile && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
                className="flex w-full border rounded-lg h-fit border-secondary-500"
              >
                {/* 필드명 리스트 */}
                <div className="py-[7px] pl-[18px] pr-6 flex flex-col gap-2 border-r border-r-grayScale-200">
                  {displayFields.map((key, index) => (
                    <div
                      key={index}
                      className="w-[131px] h-[28px] text-secondary-500 b5 flex items-center"
                    >
                      {fieldMapping[key]}
                    </div>
                  ))}
                </div>

                {/* 입력 필드 */}
                <div className="p-[7px] bg-grayScale-25 w-full rounded-r-lg flex flex-col gap-2">
                  {displayFields.map((key, index) => (
                    <EditInput
                      key={index}
                      value={String(formData?.[key] ?? "")}
                      onChange={(e) => handleChange(key, e.target.value)}
                    />
                  ))}
                </div>
              </form>
            )}
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex w-full gap-5">
          <Button size="medium" color="gray" onClick={closeEdit}>
            취소
          </Button>
          <Button size="medium" color="green" onClick={onSubmit}>
            완료
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
