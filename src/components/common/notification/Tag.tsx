interface TagProps {
  text: string;
}

/**
 *
 * @param text - 이름
 * @returns
 */
const Tag = ({ text }: TagProps) => {
  return (
    <div className="w-fit center px-1 py-[2px] rounded-[4px] bg-secondary-25 text-secondary-500 b2 h-[22px] flex items-center">
      {text}
    </div>
  );
};

export default Tag;
