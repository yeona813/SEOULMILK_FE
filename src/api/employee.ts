import { api } from "./index";
import { Role, useUserStore } from "@/stores/useUserStore";

/**
 * 사원 로그인
 *
 * @param employeeNum - 사원번호
 * @param password - 비밀번호
 * @returns accessToken
 */
export const postEmployeeLogin = async (
  employeeNum: string,
  password: string,
  role: Role
) => {
  try {
    const response = await api.post("/employee/login", {
      employeeNum,
      password,
    });

    if (response.data && response.data.success) {
      const { accessToken, refreshToken, memberId, name, email } =
        response.data.data;

      // Zustand 스토어 업데이트
      useUserStore.getState().setUser({
        id: memberId, // 'memberId'를 스토어의 'id' 필드로 매핑
        name,
        email,
        role,
      });

      // 로컬 스토리지에 토큰 저장
      localStorage.setItem("name", name);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return true;
    } else {
      // 로그인 실패 처리
      console.error("Login failed:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Login API error:", error);
    return null;
  }
};

/**
 * 사원 - 비밀번호 찾기 - 인증코드 요청
 *
 * @param employeeNum - 사원번호
 * @param email - 이메일
 * @returns
 */
export const postFindPW = async (employeeNum: string, email: string) => {
  try {
    const response = await api.post("/employee/find-password/otp", {
      employeeNum,
      email,
    });

    if (response.data) {
      return response.data.success;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 비밀번호 찾기 - 인증코드 입력
 *
 * @param employeeNum - 사원번호
 * @param otpNumber - otp
 * @returns
 */
export const postOTPVerify = async (employeeNum: string, otpNumber: string) => {
  try {
    const response = await api.post("/employee/find-password/otp/verify", {
      employeeNum,
      otpNumber,
    });

    if (response.data) {
      return response.data.success;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 비밀번호 변경 - 인증코드 입력 후
 *
 * @param employeeNum - 사원번호
 * @param password - 새로운 비밀번호
 * @returns
 */
export const patchPWUpdate = async (employeeNum: string, password: string) => {
  try {
    const response = await api.patch("/employee/update-password", {
      employeeNum,
      password,
    });

    if (response.data) {
      return response.data.success;
    }
  } catch (error) {
    console.error(error);
  }
};
