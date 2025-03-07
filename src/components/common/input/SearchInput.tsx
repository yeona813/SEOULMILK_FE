interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSearch?: () => void;
  placeholder?: string;
}

/**
 *
 * @param value - input의 value를 지정합니다.
 * @param onChange - input의 변경을 추적합니다.
 * @param placeholder - 플레이스 홀더 값을 지정합니다.
 * @param onSearch - 검색 함수를 지정합니다. 
 * @returns
 */
const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder = "검색",
  className = "",
}: SearchInputProps): React.ReactElement => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch();
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
      <button
        onClick={handleSearchClick}
        className="absolute text-gray-400 transform -translate-y-1/2 right-1 top-1/2"
        aria-label="검색"
      >
        <img src="/assets/icons/search.svg" alt="검색 아이콘" />
      </button>
    </div>
  );
};

export default SearchInput;
