import { api } from "./index";

/**
 * 사원 로그인
 *
 * @param employeeNum - 사원번호
 * @param password - 비밀번호
 * @returns
 */
export const postEmployeeLogin = async (
  employeeNum: string,
  password: string
) => {
  try {
    const response = await api.post("/employee/login", {
      employeeNum,
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
