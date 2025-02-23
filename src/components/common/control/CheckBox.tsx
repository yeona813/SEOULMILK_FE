const CheckBox = () => {
  return (
    <input
      type="checkbox"
      className="w-[18px] h-[18px] border rounded-[4px] border-grayScale-200 checked:bg-[url('/icons/checkBox.svg')] bg-no-repeat bg-center checked:border-secondary-300 appearance-none"
    />
  );
};

export default CheckBox;
