import { useState, useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useUserStore } from "@/stores/useUserStore";

const EmployeeNumberInput = () => {
  const { register, watch, setValue } = useFormContext();
  const employeeNumber = watch("employeeNumber");
  const [isFocused, setIsFocused] = useState(false);

  const clearInput = () => {
    setValue("employeeNumber", "");
  };

  const { role } = useUserStore();

  const getPlaceholder = useCallback(() => {
    const placeholders: Record<string, string> = {
      headquarters: "사원번호",
      dealership: "아이디",
      admin: "마스터키",
    };

    return placeholders[role] || "사원번호";
  }, [role]);

  const [placeholder, setPlaceholder] = useState(getPlaceholder());

  useEffect(() => {
    setPlaceholder(getPlaceholder());
  }, [role, getPlaceholder]);

  const onFocus = () => {
    setIsFocused(true);
    setPlaceholder(`${getPlaceholder()}를 입력해 주세요`);
  };

  const onBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
    setPlaceholder(getPlaceholder());
  };
  if (role === "admin") {
    return (
      <div className="relative flex items-center w-[442px] border-[1px] border-grayScale-100 border-solid h-[60px] rounded-[16px]">
        <input
          className="bg-grayScale-50 placeholder-gray-400 rounded-[15px] text-gray-800 w-full h-full b2 pl-10 pr-10 focus:ring-2 focus:ring-secondary-500 focus:outline-none focus:caret-secondary-500"
          id="employeeNumber"
          type="text"
          placeholder={placeholder}
          {...register("employeeNumber", {
            required: true,
          })}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <div className="absolute inset-y-0 z-10 px-2 center left-1 ">
          <img src="/assets/icons/lock.svg" alt="lock" />
        </div>
        {isFocused && employeeNumber && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearInput();
            }}
            type="button"
            className="absolute inset-y-0 z-10 px-2 center right-2 "
          >
            <img
              src="/assets/icons/delete.svg"
              alt="Delete"
              className="w-[22px] h-[22px] hover:bg-gray-200 rounded-full"
            />
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="relative flex items-center w-[442px] border-[1px] border-grayScale-100 border-solid h-[60px] rounded-[16px]">
      <input
        className="bg-grayScale-50 placeholder-gray-400 rounded-[15px] text-gray-800 w-full h-full b2 pl-4 pr-10 focus:ring-2 focus:ring-secondary-500 focus:outline-none focus:caret-secondary-500"
        id="employeeNumber"
        type="text"
        placeholder={placeholder}
        {...register("employeeNumber", {
          required: true,
        })}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {isFocused && employeeNumber && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearInput();
          }}
          type="button"
          className="absolute inset-y-0 z-10 px-2 center right-2 "
        >
          <img
            src="/assets/icons/delete.svg"
            alt="Delete"
            className="w-[22px] h-[22px] hover:bg-gray-200 rounded-full"
          />
        </button>
      )}
    </div>
  );
};

export default EmployeeNumberInput;
