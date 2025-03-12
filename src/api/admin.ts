import { Employee, Shop } from "@/types/admin";
import { useUserStore } from "@/stores/useUserStore";
import { api } from "./index";

/**
 * 관리자 로그인
 *
 * @param masterKey - 마스터키
 * @returns
 */
export const postAdminLogin = async (masterKey: string) => {
  try {
    const response = await api.post("/admin/login", {
      masterKey,
    });

    if (response.data) {
      localStorage.setItem("role", "admin");
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      useUserStore.getState().setUser({
        role: "admin",
      });
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * 관리자 - 세금 계산서 통합 조회
 *
 * @param page - 조회할 page
 * @param status - "APPROVAL" | "REJECTION" | undefined
 * @returns
 */
export const getAdminNtsTax = async (page: number, status?: string) => {
  const accessToken = localStorage.getItem("accessToken");

  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (status) {
    params.append("status", status);
  }

  try {
    const response = await api.get(`/admin/nts-tax?${params.toString()}`, {
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
 * 관리자 - 세금 계산서 페이지 삭제
 *
 * @param deleteNtsTaxIds - 삭제할 세금 계산서
 * @returns
 */
export const deleteNtsTaxIds = async (ntsTaxId: number[]) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await api.delete("/admin/nts-tax", {
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
 * 관리자 - 사원 일괄 등록
 *
 * @param data - 사원 데이터
 * @returns
 */
export const postAddEmployee = async (data: Employee[]) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await api.post(
      "/admin/employee/register-employees",
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.success) {
      return true;
    }
  } catch (error) {
    return false;
    console.error(error);
  }
};

/**
 * 관리자 - 대리점 일괄 등록
 *
 * @param data - 대리점 데이터
 * @returns
 */
export const postAddShop = async (data: Shop[]) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await api.post("/admin/agency/register-agencies", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data.success) {
      return true;
    }
  } catch (error) {
    return false;
    console.error(error);
  }
};

/**
 * 관리자 - 세금 계산서 csv 추출 - 선택된 id만
 *
 * @param ntsTaxId - CSV로 제출할 id 리스트
 * @returns
 */
export const postCheckedCSV = async (ntsTaxId: number[]) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await api.post(
      "/admin/nts-tax/csv",
      { ntsTaxId: ntsTaxId },
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

export const getAgencyList = async (page: number) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await api.get(`/admin/agency?page=${page}`, {
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
