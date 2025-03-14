import * as Papa from "papaparse";

export const downloadCSV = (data: unknown[]) => {
  // 오늘 날짜 구하기 (YYYY.MM.DD 형식)
  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

  // 파일 이름 생성 (예: "2025.03.20_세금계산서검증결과.csv")
  const filename = `${formattedDate}_세금계산서검증결과.csv`;

  // JSON 데이터를 CSV로 변환
  const csv = Papa.unparse(data);

  // Blob을 생성하여 파일로 변환
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // 동적으로 a 태그 생성 후 다운로드 실행
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
