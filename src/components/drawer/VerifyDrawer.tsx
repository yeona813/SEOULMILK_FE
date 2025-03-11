import { useEffect, useState } from "react";
import useTaxInvoiceStore, {
  useDrawerStore,
  useRevalidateStore,
} from "@/stores/useDrawerStore";
import Drawer from "./Drawer";
import Button from "../common/button/Button";
import NotiMessage from "../common/notification/NotiMessage";
import InvoiceDetails from "../verify/InvoiceDetails";
import EditableInvoiceDetails from "../verify/EditableInvoiceDetails";
import {
  getDownloadTax,
  putIndividualEmployeeTax,
  revalidateEmployeeTax,
  TaxInvoiceUpdateRequest,
} from "@/api/employeeTax";
import useModalStore from "@/stores/useModalStore";

interface VerifyDrawerProps {
  suName: string;
  validationResult: boolean;
  ipName: string;
  ntsTaxId: number;
}

const VerifyDrawer = ({ validationResult, ntsTaxId }: VerifyDrawerProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const { invoice, fetchInvoice, updateInvoice } = useTaxInvoiceStore();
  const { isRevalidating, isSuccess } = useRevalidateStore();
  const { closeVerifyDrawer, isVerifyDrawerOpen } = useDrawerStore();
  const { openSuccessRevalidationModal } = useModalStore();
  const store = useRevalidateStore();
  useEffect(() => {
    fetchInvoice(ntsTaxId);
  }, [ntsTaxId, fetchInvoice]);

  const handleRevalidate = async () => {
    try {
      store.setRevalidating(true);
      const response = await revalidateEmployeeTax(ntsTaxId);
      if (response.success && response.data.resAuthenticity === "1") {
        store.setValidationSuccess(true); // 재검증 성공 시
      } else {
        store.setValidationSuccess(false); // 재검증 실패 시
      }
    } catch (error) {
      console.error("Revalidation Failed:", error);
      store.setValidationSuccess(false); // 에러 발생 시 실패 처리
    } finally {
      store.setRevalidating(false);
    }
  };

  if (!invoice) return <div>No data available.</div>;

  const formattedNumber = invoice.ntsTaxId.toString().padStart(3, "0");
  const fileType = invoice.imageUrl.endsWith(".pdf") ? "pdf" : "image";

  const HandleEdit = () => {
    setIsEdit(!isEdit); // Toggle the edit state
  };

  const handleInputChange = (field: "suName" | "ipName", value: string) => {
    updateInvoice(field, value);
  };

  const handleRevalidateSuccess = () => {
    closeVerifyDrawer();
    openSuccessRevalidationModal();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth()는 0부터 시작하므로 1을 더해야 함
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSave = async () => {
    if (!invoice) return;

    const updatedData: TaxInvoiceUpdateRequest = {
      suName: invoice.suName,
      ipName: invoice.ipName,
      issueId: invoice.issueId,
      issueDate: formatDate(invoice.issueAt),
      suId: invoice.suId,
      ipId: invoice.ipId,
      chargeTotal: invoice.chargeTotal,
      taxTotal: invoice.taxTotal,
      grandTotal: invoice.grandTotal,
    };

    try {
      const result = await putIndividualEmployeeTax(ntsTaxId, updatedData);
      console.log("Update Success:", result);
      setIsEdit(false); // Edit mode off
      fetchInvoice(ntsTaxId); // Refresh data
    } catch (error) {
      console.error("Update Failed:", error);
    }
  };

  return (
    <Drawer onClose={closeVerifyDrawer}>
      <div
        className={`flex-col h-screen center drawer ${isVerifyDrawerOpen ? "open" : ""} relative`}
      >
        <div className="absolute w-[784px] p-3 center flex-col h-[562px] gap-[10px] -left-[820px] bg-white rounded-[14px]">
          {fileType === "image" ? (
            <div className="h-[500px] w-full border border-solid border-grayScale-300 rounded-md">
              <img
                src={invoice.imageUrl}
                alt="Document"
                className="w-full h-full rounded-md cover"
              />
            </div>
          ) : (
            <div>
              <object
                data={invoice.imageUrl}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>
                  Your browser does not support PDFs.{" "}
                  <a href={invoice.imageUrl}>Download the PDF</a>.
                </p>
              </object>
            </div>
          )}
          <div
            className="center gap-1 rounded-[8px] bg-grayScale-25 w-full h-8 cursor-pointer b5 text-grayScale-600"
            onClick={() => getDownloadTax(invoice.imageUrl)}
          >
            <img src="/assets/icons/download.svg" alt="Download original" />
            원본 다운로드
          </div>
        </div>
        <div className="w-[421px]">
          <div>
            <div className="text-grayScale-400 b2">{formattedNumber}</div>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={invoice.suName || ""}
                  onChange={(e) => handleInputChange("suName", e.target.value)}
                  className="w-full h-10 px-2 my-2 text-lg bg-white border border-gray-300 rounded focus:outline-none focus:border-secondary-500"
                />
                <input
                  type="text"
                  value={invoice.ipName || ""}
                  onChange={(e) => handleInputChange("ipName", e.target.value)}
                  className="w-full h-10 px-2 my-2 text-lg bg-white border border-gray-300 rounded focus:outline-none focus:border-secondary-500"
                />
              </>
            ) : (
              <>
                <div
                  className={`h2 ${!(invoice.suName === "") ? "" : "text-grayScale-300"}`}
                >
                  {!(invoice.suName === "")
                    ? invoice.suName
                    : "공급자명 OCR 실패"}
                </div>
                <div
                  className={`h2 ${!(invoice.ipName === "") ? "" : "text-grayScale-300"}`}
                >
                  {!(invoice.ipName === "")
                    ? invoice.ipName
                    : "공급 받는자명 OCR 실패"}
                </div>
              </>
            )}
          </div>
          <div className="mt-10">
            {isSuccess ? (
              <NotiMessage
                type="success"
                text="홈택스 검증결과, 발급된 사실이 있습니다."
              />
            ) : isRevalidating ? (
              <NotiMessage type="validate" text="재검증 중입니다..." />
            ) : validationResult ? (
              <NotiMessage
                type="success"
                text="홈택스 검증결과, 발급된 사실이 있습니다."
              />
            ) : (
              <NotiMessage
                type="error"
                text="홈택스 검증결과, 발급된 사실이 없습니다."
              />
            )}
          </div>
          {!isEdit ? <InvoiceDetails /> : <EditableInvoiceDetails />}

          {!validationResult && (
            <div className="flex gap-2 mt-[14px]">
              {isSuccess ? (
                <Button
                  size="medium"
                  color="green"
                  onClick={handleRevalidateSuccess}
                >
                  완료
                </Button>
              ) : (
                <>
                  <Button
                    size="medium"
                    color="green"
                    onClick={isEdit ? handleSave : HandleEdit}
                    disabled={isRevalidating}
                  >
                    <div className="exist-icon">
                      <img src="/assets/icons/edit.svg" alt="Edit" />
                      {isEdit ? "저장" : "편집"}
                    </div>
                  </Button>
                  <Button
                    size="medium"
                    color="black"
                    disabled={isRevalidating || isEdit}
                    onClick={handleRevalidate}
                  >
                    <div className="exist-icon">
                      <img src="/assets/icons/checkVerified.svg" alt="Verify" />
                      홈택스 검증
                    </div>
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default VerifyDrawer;
