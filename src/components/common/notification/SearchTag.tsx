interface SearchTagProps {
  text: string;
}

const SearchTag = ({ text }: SearchTagProps) => {
  return (
    <div className="flex items-center gap-1 b5 text-secondary-500 bg-secondary-25 py-[3px] px-2 rounded-[20px]">
      {text}{" "}
      <div>
        <svg
          className="cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M5 5L13 13M13 5L5 13"
            stroke="#009857"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchTag;
