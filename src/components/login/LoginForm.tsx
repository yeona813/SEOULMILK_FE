import { useForm, FormProvider } from "react-hook-form";
import EmployeeNumberInput from "../common/input/EmployeeNumberInput";
import PasswordInput from "../common/input/PasswordInput";
import ErrorMessages from "./ErrorMessage";
import UserPicker from "../common/control/UserPicker";
import { postEmployeeLogin } from "@/api/employee";
import { useUserStore } from "@/stores/useUserStore";
import { postAgencyLogin } from "@/api/agency";
import { useNavigate } from "react-router-dom";

interface FormValues {
  employeeNumber: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { role } = useUserStore();

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      employeeNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    let accessToken: string | null = null;

    if (role === "admin") {
      console.log("해야함");
    } else if (role === "dealership") {
      accessToken = await postAgencyLogin(data.employeeNumber, data.password);
    } else {
      accessToken = await postEmployeeLogin(data.employeeNumber, data.password);
    }

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      if (role === "admin") {
        navigate("/addUser");
      } else if (role === "dealership") {
        navigate("/submit");
      } else {
        navigate("/verify");
      }
    }
  };

  return (
    <div className="w-[443px]">
      <div className="mb-4">
        <UserPicker />
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 mb-[17px]">
            <EmployeeNumberInput />
            <PasswordInput />
          </div>
          <ErrorMessages />
          <div className="mt-[18px] flex flex-col gap-4">
            <button
              type="submit"
              className={`w-full h-[60px] rounded-xl st1 text-white center ${
                methods.formState.isValid
                  ? "bg-secondary-500"
                  : "bg-secondary-50"
              }`}
              disabled={!methods.formState.isValid}
            >
              로그인
            </button>
            <button className="w-full text-grayScale-400 b2">
              비밀번호 재설정
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
