interface CheckBoxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      className="w-[18px] h-[18px] border rounded-[4px] border-grayScale-200 checked:bg-[url('/assets/icons/checkBox.svg')] bg-no-repeat bg-center checked:border-secondary-300 appearance-none hover:border-secondary-300 group-hover:border-secondary-300"
      checked={checked}
      onChange={onChange}
    />
  );
};

export default CheckBox;
