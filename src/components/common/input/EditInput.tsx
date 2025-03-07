import React, { forwardRef } from "react";

interface EditInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const EditInput = forwardRef<HTMLInputElement, EditInputProps>(
  (
    { value, onChange, placeholder = "수정할 값을 직접 입력해주세요." },
    ref
  ) => {
    return (
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-7 px-[10px] py-[4.5] b5 border bg-grayScale-25 border-grayScale-300 rounded focus:ring-green-500 focus:outline-none focus:ring-2"
      />
    );
  }
);

export default EditInput;
