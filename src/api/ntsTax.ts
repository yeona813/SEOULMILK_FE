import { NtsTax } from "@/types/ntsTax";
import { api } from ".";

const accessToken = localStorage.getItem("accessToken");

/**
 * 대리점 - 세금 계산서 목록 조회
 *
 * @param page - 페이지
 * @param isSuccess - OCR 성공, 실패 여부부
 * @returns
 */
export const getNtsTax = async (page: number, isSuccess: string) => {
  try {
    const response = await api.get(
      `/agency/nts-tax?page=${page}&isSuccess=${isSuccess}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data) {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 대리점 - 세금 계산서 OCR
 *
 * @param files - 파일 목록
 * @returns
 */
export const postNtsTaxUpload = async (files: FormData) => {
  try {
    const response = await api.post("/agency/nts-tax/upload", files, {
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

/**
 * 대리점 - 세금 계산서 수정
 *
 * @param data
 * @returns
 */
export const putNtsTaxEdit = async (ntsTaxId: number, data: NtsTax) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await api.put(`/agency/nts-tax/${ntsTaxId}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data) {
      return response.data.success;
    }
  } catch (error) {
    console.error("파일 업로드 실패:", error);
  }
};

/**
 * 본사, 대리점 - 세금 계산서 페이지 내 다건 삭제
 *
 * @param deleteNtsTaxIds
 * @returns
 */
export const deleteNtsTaxIds = async (ntsTaxId: number[]) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await api.delete("/agency/nts-tax/multiple", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: { ntsTaxId: ntsTaxId },
    });

    if (response.data) {
      return response.data.success;
    }
  } catch (error) {
    console.error("다중 삭제 API 호출 중 오류 발생:", error);
  }
};

/**
 * 대리점 - 선택한 세금 계산서 제출
 *
 * @param idList - 제출할 아이디 리스트
 * @returns
 */
export const postNtsTaxSubmit = async (idList: number[]) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await api.post(
      "/agency/nts-tax/submit-hometax",
      { idList: idList },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 대리점 - 전체 세금 계산서 제출
 *
 * @param idList - 제출할 아이디 리스트
 * @returns
 */
export const postNtsTaxSubmitAll = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await api.post(
      "/agency/nts-tax/submit-hometax/all",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};
