import Drawer from "../../drawer/Drawer";
import { useState } from "react";
import {
  useEditDrawerStore,
  useSubmitInvoiceStore,
} from "@/stores/useSubmitDrawerStore";
import Button from "../../common/button/Button";
import InvoiceDetail from "./InvoiceDetail";
import EditableInvoice from "./EditableInvoice";
import { deleteNtsTaxIds, putNtsTaxEdit } from "@/api/ntsTax";
import { NtsTax } from "@/types/ntsTax";

const SubmitDrawer = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { isFailDrawerOpen, closeFailDrawer } = useEditDrawerStore();
  const { selectedItem, updateInvoice } = useSubmitInvoiceStore();

  const handleInputChange = (field: "suName" | "ipName", value: string) => {
    updateInvoice(field, value);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = async () => {
    if (!selectedItem) return;

    const updatedData: NtsTax = {
      issueId: selectedItem.issueId,
      issueDate: selectedItem.issueDate,
      suId: selectedItem.suId,
      suName: selectedItem.suName,
      ipId: selectedItem.ipId,
      ipName: selectedItem.ipName,
      grandTotal: selectedItem.grandTotal,
      chargeTotal: selectedItem.chargeTotal,
      taxTotal: selectedItem.chargeTotal,
    };

    try {
      const result = await putNtsTaxEdit(selectedItem.ntsTaxId!, updatedData);

      if (result) {
        closeFailDrawer();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      const success = await deleteNtsTaxIds([selectedItem.ntsTaxId!]);
      if (success) {
        closeFailDrawer();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!selectedItem) return <p>데이터가 없습니다.</p>;

  const formattedNumber = selectedItem.ntsTaxId!.toString().padStart(3, "0");
  const fileType = selectedItem.imageUrl!.endsWith(".pdf") ? "pdf" : "image";

  return (
    <Drawer onClose={closeFailDrawer}>
      <div
        className={`flex-col h-screen center drawer ${isFailDrawerOpen ? "open" : ""} relative`}
      >
        <div className="absolute w-[784px] p-3 center flex-col h-[562px] gap-[10px] -left-[820px] bg-white rounded-[14px]">
          {fileType === "image" ? (
            <div className="h-[500px] w-full border border-solid border-grayScale-300 rounded-md">
              <img
                src={selectedItem.imageUrl}
                alt="Document"
                className="w-full h-full rounded-md cover"
              />
            </div>
          ) : (
            <div>
              <object
                data={selectedItem.imageUrl}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>
                  Your browser does not support PDFs.{" "}
                  <a href={selectedItem.imageUrl}>Download the PDF</a>.
                </p>
              </object>
            </div>
          )}
        </div>
        <div className="w-[421px]">
          <div>
            <div className="text-grayScale-400 b2">{formattedNumber}</div>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={selectedItem.suName || ""}
                  onChange={(e) => handleInputChange("suName", e.target.value)}
                  className="w-full h-10 px-2 my-2 text-lg bg-white border border-gray-300 rounded focus:outline-none focus:border-secondary-500"
                />
                <input
                  type="text"
                  value={selectedItem.ipName || ""}
                  onChange={(e) => handleInputChange("ipName", e.target.value)}
                  className="w-full h-10 px-2 my-2 text-lg bg-white border border-gray-300 rounded focus:outline-none focus:border-secondary-500"
                />
              </>
            ) : (
              <>
                <div
                  className={`h2 ${!(selectedItem.suName === "") ? "" : "text-grayScale-300"}`}
                >
                  {!(selectedItem.suName === "")
                    ? selectedItem.suName
                    : "공급자명 OCR 실패"}
                </div>
                <div
                  className={`h2 ${!(selectedItem.ipName === "") ? "" : "text-grayScale-300"}`}
                >
                  {!(selectedItem.ipName === "")
                    ? selectedItem.ipName
                    : "공급 받는자명 OCR 실패"}
                </div>
              </>
            )}
            {!isEdit ? <InvoiceDetail /> : <EditableInvoice />}
          </div>
          <div className="flex gap-2 mt-[14px]">
            <Button
              size="medium"
              color="green"
              onClick={isEdit ? handleSave : handleEdit}
            >
              <div className="exist-icon">
                <img src="/assets/icons/edit.svg" alt="Edit" />
                {isEdit ? "저장" : "편집"}
              </div>
            </Button>
            <Button size="medium" color="black" onClick={handleDelete}>
              <div className="exist-icon">
                <img src="/assets/icons/trash.svg" alt="Verify" />
                삭제
              </div>
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default SubmitDrawer;
