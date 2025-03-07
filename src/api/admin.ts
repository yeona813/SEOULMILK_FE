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
      const accessToken = response.data.data?.accessToken;
      return accessToken;
    }
  } catch (error) {
    console.log(error);
  }
};
