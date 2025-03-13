import { Employee, Shop } from "@/types/admin";
import { useUserStore } from "@/stores/useUserStore";
import { api } from "./index";

/**
 * 관리자 로그인
 *
 * @param masterKey - 마스터키
 * @returns {Promise<boolean>}
 */
export const postAdminLogin = async (masterKey: string): Promise<boolean> => {
  try {
    const response = await api.post("/admin/login", { masterKey });

    if (response.data) {
      const { accessToken, refreshToken } = response.data.data;

      await Promise.all([
        localStorage.setItem("role", "admin"),
        localStorage.setItem("accessToken", accessToken),
        localStorage.setItem("refreshToken", refreshToken),
      ]);

      useUserStore.getState().setUser({
        role: "admin",
      });

      return true;
    }
    return false;
  } catch (error) {
    console.error("Login failed:", error);
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

export const getSignAgencyList = async (page: number) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await api.get(`/admin/agency/registered?page=${page}`, {
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
 * 관리자 - 조회 조건 설정 시 csv 추출
 *
 * @param startMonth - 시작 날짜
 * @param endMonth - 끝나는 날짜
 * @param supplierTags - 공급자 목록
 * @param recipientTags - 공급받는자 목록
 * @param status - 상태
 * @returns
 */
export const getNtsTaxCSV = async (
  startMonth: Date | null,
  endMonth: Date | null,
  supplierTags: string[],
  recipientTags: string[],
  status?: string
) => {
  const accessToken = localStorage.getItem("accessToken");

  const params = new URLSearchParams();

  if (startMonth) {
    params.append("startAt", startMonth.toISOString().split("T")[0]);
  }
  if (endMonth) {
    params.append("endAt", endMonth.toISOString().split("T")[0]);
  }

  supplierTags.forEach((tag) => {
    params.append("suNameList", tag);
  });

  recipientTags.forEach((tag) => {
    params.append("ipNameList", tag);
  });

  try {
    const url = status
      ? `/admin/nts-tax/csv?status=${status}&${params.toString()}`
      : `/admin/nts-tax/csv?${params.toString()}`;

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

/**
 * 관리자 - 대리점 초대 메일 발송
 *
 * @param idList - 초대할 idList
 * @returns
 */
export const postInviteAgency = async (idList: number[]) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await api.post(
      "/admin/agency/invite",
      { idList: idList },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (response.data) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getEmployeeList = async (page: number) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await api.get(`/admin/employee?page=${page}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response) {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getShopList = async (page: number) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await api.get(`/admin/agency?page=${page}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response) {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 담당 가능한 대리점 조회
 *
 * @param employeeId
 * @returns
 */
export const getEmployeeAgency = async (employeeId: number) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await api.get(
      `/admin/employee/${employeeId}/assign-agency`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
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
 * 담당 대리점 배정
 *
 * @param employeeId
 * @param idList
 */
export const postAssignAgency = async (
  employeeId: number,
  idList: number[]
) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await api.post(
      `/admin/employee/${employeeId}/assign-agency`,
      { idList: idList },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (response.data) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};
