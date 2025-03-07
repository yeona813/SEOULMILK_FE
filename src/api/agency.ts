import { api } from "./index";

/**
 * 대리점 로그인
 *
 * @param employeeNum - 사원번호
 * @param password - 비밀번호
 * @returns
 */
export const postAgencyLogin = async (
  employeeNum: string,
  password: string
) => {
  try {
    const response = await api.post("/agency/login", {
      agencyId: employeeNum,
      password,
    });

    if (response.data) {
      const accessToken = response.data.data?.accessToken;
      return accessToken;
    }
  } catch (error) {
    console.log(error);
  }
};
