import { useState } from "react";
import { useFormContext } from "react-hook-form";

const PasswordInput = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const password = watch("password");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState("비밀번호");

  const clearInput = () => {
    setValue("password", "");
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  console.log(errors);
  const onFocus = () => {
    setIsFocused(true);
    setPlaceholder("비밀번호를 입력해 주세요");
  };

  const onBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);

    setPlaceholder("비밀번호");
  };

  return (
    <div className="relative flex items-center w-[442px] border-[1px] border-grayScale-100 border-solid h-[60px] rounded-[16px]">
      <input
        className="bg-grayScale-50 placeholder-gray-400 rounded-[15px] text-gray-800 w-full h-full text-lg pl-4 pr-10 font-semibold focus:ring-2 focus:ring-secondary-500 focus:outline-none focus:caret-secondary-500"
        type={isPasswordVisible ? "text" : "password"}
        id="password"
        placeholder={placeholder}
        value={password}
        {...register("password", {
          required: "Password is required",
          pattern: {
            value: /^[A-Za-z0-9]+$/,
            message: "Password must be alphanumeric",
          },
        })}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {isFocused && (
        <>
          <button
            onClick={togglePasswordVisibility}
            type="button"
            className="absolute inset-y-0 px-2 right-8 center"
          >
            <img
              src={isPasswordVisible ? "/icons/eye.svg" : "/icons/eyeOff.svg"}
              alt="Toggle visibility"
              className="w-4 h-4"
            />
          </button>
          <button
            onClick={clearInput}
            type="button"
            className="absolute inset-y-0 px-2 right-2 center"
          >
            <img src="/icons/delete.svg" alt="Delete" className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
};

export default PasswordInput;
