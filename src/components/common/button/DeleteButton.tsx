interface DeleteButtonProps {
  onClick: () => void;
}

/**
 *
 * @param onClick - 버튼 클릭 시 수행할 함수
 * @returns
 */
const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <img
      src="/assets/icons/delete.svg"
      alt="delete"
      className="cursor-pointer hover:rounded-full hover:bg-grayScale-200"
      onClick={onClick}
    />
  );
};

export default DeleteButton;
