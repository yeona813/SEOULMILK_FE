import LoginForm from "@/components/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen center bg-grayScale-25">
      <div className="flex-col center gap-[45px] w-[563px] h-[550px] p-[60px] bg-white rounded-[20px] border-solid border border-grayScale-50">
        <img
          src="/assets/icons/logo.svg"
          alt="서울우유협동조합"
          width={"283px"}
          height={"46px"}
        />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
