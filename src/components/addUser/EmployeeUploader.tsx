import { postAddEmployee } from "@/api/admin";
import useModalStore from "@/stores/useModalStore";
import { Employee } from "@/types/admin";
import { useRef } from "react";
import * as XLSX from "xlsx";
import SuccessTextModal from "../common/modal/SuccessTextModal";

interface KoreanEmployee {
  이름: string;
  사번: number;
  이메일: string;
}

const EmployeeUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isSuccessText, openSuccessText } = useModalStore();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      // 파일 읽기를 Promise로 감싸 비동기 흐름 보장
      const fileData = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target?.result) {
            resolve(e.target.result as ArrayBuffer);
          } else {
            reject(new Error("File read error"));
          }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
      });

      // 엑셀 파싱
      const workbook = XLSX.read(fileData, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: KoreanEmployee[] = XLSX.utils.sheet_to_json(worksheet);

      // 한글 키를 Employee 타입으로 변환
      const employees: Employee[] = jsonData
        .filter((row) => row.이름 && row.사번 && row.이메일) // 빈 값 제거
        .map((row) => ({
          employeeNum: String(row.사번),
          name: String(row.이름).trim(),
          email: String(row.이메일).trim(),
        }));

      // ✅ API 요청
      const success = await postAddEmployee(employees);
      if (success) {
        openSuccessText("사원 등록");
      }
    } catch (error) {
      console.error("Error during file processing:", error);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv, .xlsx, .xls"
        onChange={handleFileUpload}
        ref={fileInputRef}
        className="hidden"
      />
      <button
        className="px-[18px] py-2 rounded-lg bg-grayScale-100 text-grayScale-600 b3 hover:bg-gray-300"
        onClick={handleClick}
      >
        일괄등록
      </button>
      {isSuccessText && <SuccessTextModal />}
    </div>
  );
};

export default EmployeeUpload;
