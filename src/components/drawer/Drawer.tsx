import React, { useEffect, useRef } from "react";
import DrawerPortal from "../common/portal/DrawerPortal";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

/**
 *
 * @param children - 모달 안의 내용
 * @param onClose - (optional) 모달 닫는 함수
 * @returns
 */
const Drawer = ({ children, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <DrawerPortal>
      <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-20">
        <div
          ref={modalRef}
          className="p-6 bg-white shadow-[0px_4px_50px_0px_rgba(0,0,0,0.05)] rounded-[20px]"
        >
          {children}
        </div>
      </div>
    </DrawerPortal>
  );
};

export default Drawer;
