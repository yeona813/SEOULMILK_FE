import { useUserStore } from "@/stores/useUserStore";
import { api } from "./index";
import { Role } from "@/stores/useUserStore";

/**
 * 대리점 로그인
 *
 * @param agencyId - 대리점 ID
 * @param password - 비밀번호
 * @param role - 로그인하는 유저의 역할
 * @returns accessToken
 */
export const postAgencyLogin = async (
  agencyId: string,
  password: string,
  role: Role
) => {
  try {
    const response = await api.post("/agency/login", {
      agencyId,
      password,
    });

    if (response.data && response.data.success) {
      const { accessToken, refreshToken, memberId, name, email } =
        response.data.data;

      // Zustand 스토어 업데이트
      useUserStore.getState().setUser({
        id: memberId,
        name,
        email,
        role,
      });

      // 로컬 스토리지에 토큰 저장
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return true;
    } else {
      // 에러 메시지를 처리하거나 반환
      console.error("Login failed:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Login API error:", error);
    return null;
  }
};
