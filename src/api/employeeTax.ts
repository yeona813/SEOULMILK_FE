import { OCRFile } from "@/stores/useModalStore";
import { api } from ".";

/**
 * 세금 계산서 목록 조회
 *
 * @param page - 페이지
 * @returns
 */
export const getEmployeeTax = async (page: number, status: string) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await api.get(
      `/employee/nts-tax/view-hometax/recent?page=${page}&status=${status}`,
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

export const getEmployeeAllTax = async (page: number, status: string) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    let url = `/employee/nts-tax/view-hometax/history?page=${page}`;

    if (status.trim()) {
      url += `&status=${status}`;
    }

    const response = await api.get(url, {
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

export const getIndividualEmployeeTax = async (id: number) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await api.get(`/employee/nts-tax/${id}`, {
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

export interface TaxInvoiceUpdateRequest {
  suName: string;
  ipName: string;
  issueId: string;
  issueDate: string;
  suId: string;
  ipId: string;
  chargeTotal: string;
  taxTotal: string;
  grandTotal: string;
}

export const putIndividualEmployeeTax = async (
  id: number,
  data: TaxInvoiceUpdateRequest
) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await api.put(`/employee/nts-tax/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update tax invoice:", error);
    throw error;
  }
};

export const revalidateEmployeeTax = async (id: number) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await api.post(
      `/employee/nts-tax/${id}/revalidate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update tax invoice:", error);
    throw error;
  }
};

export const getDownloadTax = async (imageUrl: string) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await api.get(
      `/employee/nts-tax/download-image?imageUrl=${imageUrl}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "blob",
      }
    );
    if (response.data) {
      downloadBlob(response.data, imageUrl);
    }
  } catch (error) {
    console.error(error);
  }
};

function downloadBlob(blob: Blob, imageUrl: string) {
  try {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = imageUrl.split("/").pop() || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to create download link:", err);
  }
}

/**
 * 세금 계산서 OCR
 *
 * @param files - 파일 목록
 * @returns
 */
export const postEmployeeTaxUpload = async (files: FormData) => {
  const accessToken = localStorage.getItem("accessToken");
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

export const putEmployeeTaxEdit = async (data: OCRFile[]) => {
  const accessToken = localStorage.getItem("accessToken");
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

export const deleteEmployeeTax = async (ntsTaxIds: number[]) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await api.delete("/employee/nts-tax/multiple", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: {
        ntsTaxId: ntsTaxIds,
      },
    });

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("세금 계산서 데이터 삭제 실패", error);
    throw error;
  }
};

export const postEmployeeTaxCSV = async (ntsTaxIds: number[]) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await api.post(
      "/employee/nts-tax/csv",
      { ntsTaxId: ntsTaxIds }, // 요청 본문 - curl의 -d 부분과 동일
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // curl의 Authorization 헤더와 동일
          "Content-Type": "application/json", // curl의 Content-Type 헤더와 동일
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("CSV 추출 실패", error);
    throw error;
  }
};
