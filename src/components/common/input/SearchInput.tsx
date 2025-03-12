interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onEnter?: (value: string) => void; // onEnter 핸들러로 이름 변경
  placeholder?: string;
}

const SearchInput = ({
  value,
  onChange,
  onEnter,
  placeholder = "검색",
  className = "",
}: SearchInputProps): React.ReactElement => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) {
      onEnter(e.currentTarget.value);
      e.preventDefault();
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full py-[6px] px-3 bg-gray-50 border-grayScale-300 border rounded b5 focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
      />
    </div>
  );
};

export default SearchInput;
