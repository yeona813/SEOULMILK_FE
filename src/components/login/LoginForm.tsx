import { useForm, FormProvider } from "react-hook-form";
import EmployeeNumberInput from "../common/input/EmployeeNumberInput";
import PasswordInput from "../common/input/PasswordInput";

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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <EmployeeNumberInput />
            <PasswordInput />
          </div>
          <div className="mt-[35px] flex flex-col gap-4">
            <button
              type="submit"
              className={`w-full h-[60px] rounded-xl text-s1 font-bold text-white center ${
                methods.formState.isValid
                  ? "bg-secondary-500"
                  : "bg-secondary-50"
              }`}
              disabled={!methods.formState.isValid}
            >
              로그인
            </button>
            <button className="w-full font-semibold text-grayScale-400 text-b2">
              비밀번호 찾기
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
