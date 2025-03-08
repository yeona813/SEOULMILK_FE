import { OCRFile } from "@/stores/useModalStore";
import { api } from ".";

const accessToken = localStorage.getItem("accessToken");

/**
 * 세금 계산서 목록 조회
 *
 * @param page - 페이지
 * @returns
 */
export const getNtsTax = async (page: number) => {
  try {
    const response = await api.get(`/nts-tax?page=${page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data) {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 세금 계산서 OCR
 *
 * @param files - 파일 목록
 * @returns
 */
export const postNtsTaxUpload = async (files: FormData) => {
  try {
    const response = await api.post("/nts-tax/upload", files, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data) {
      return response.data.data;
    }
  } catch (error) {
    console.error("파일 업로드 실패", error);
    throw error;
  }
};

export const putNtsTaxEdit = async (data: OCRFile[]) => {
  try {
    const response = await api.put("/nts-tax/edit", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data) {
      return response.data.data;
    }
  } catch (error) {
    console.error("파일 업로드 실패", error);
    throw error;
  }
};
