import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface DropdownProps {
  onClose: () => void;
}

/**
 *
 * @param onClose - dropdown 닫는 함수
 * @returns
 */
const Dropdown = ({ onClose }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "로그아웃",
      action: () => console.log("로그아웃 기능 구현해야함"),
    },
    {
      label: "비밀번호 변경",
      action: () => console.log("비밀번호 변경 기능 구현해야 함"),
    },
    {
      label: "마이페이지",
      action: () => navigate("/my"),
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-[47px] left-0 flex flex-col gap-1 p-1 bg-white rounded-xl shadow-[0px_3px_15px_0px_rgba(0,0,0,0.10),_0px_10px_30px_8px_rgba(0,0,0,0.05)] z-50"
    >
      {menuItems.map(({ label, action }) => (
        <p
          key={label}
          onClick={action}
          className="flex items-center px-2 w-[106px] h-9 rounded-[9px] hover:bg-grayScale-50 b3 font-semibold text-grayScale-600 cursor-pointe"
        >
          {label}
        </p>
      ))}
    </div>
  );
};

export default Dropdown;
