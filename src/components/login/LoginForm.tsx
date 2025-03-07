import { useForm, FormProvider } from "react-hook-form";
import EmployeeNumberInput from "../common/input/EmployeeNumberInput";
import PasswordInput from "../common/input/PasswordInput";
import ErrorMessages from "./ErrorMessage";
import UserPicker from "../common/control/UserPicker";

interface FormValues {
  employeeNumber: string;
  password: string;
}

const LoginForm = () => {
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      employeeNumber: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
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
