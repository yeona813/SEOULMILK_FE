import { useState } from "react";
import { useFormContext } from "react-hook-form";

const PasswordInput = () => {
  const { register, watch, setValue } = useFormContext();

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
        className="bg-grayScale-50 placeholder-gray-400 rounded-[15px] text-gray-800 w-full h-full b2 pl-4 pr-10 focus:ring-2 focus:ring-secondary-500 focus:outline-none focus:caret-secondary-500"
        type={isPasswordVisible ? "text" : "password"}
        id="password"
        placeholder={placeholder}
        value={password}
        {...register("password", {
          required: true,
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
              src={
                isPasswordVisible
                  ? "/assets/icons/eye.svg"
                  : "/assets/icons/eyeOff.svg"
              }
              alt="Toggle visibility"
              className="w-4 h-4"
            />
          </button>
          <button
            onClick={clearInput}
            type="button"
            className="absolute inset-y-0 px-2 right-2 center"
          >
            <img
              src="/assets/icons/delete.svg"
              alt="Delete"
              className="w-[22px] h-[22px] hover:bg-gray-200 rounded-full"
            />
          </button>
        </>
      )}
    </div>
  );
};

export default PasswordInput;
