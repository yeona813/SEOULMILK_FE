import Sort from "@/assets/icons/sort.svg?react";

const SortButton = () => {
  return (
    <button
      className="px-[5px] py-[2px] center rounded gap-1 bg-white text-grayScale-500 c1 hover:bg-grayScale-100 hover:text-grayScale-600"
      onClick={() => {
        console.log("여기 구현해야함!! ");
      }}
    >
      생성일
      <Sort />
    </button>
  );
};

export default SortButton;
