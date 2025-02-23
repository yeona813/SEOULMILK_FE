import { useLocation, useNavigate } from "react-router-dom";
import Upload from "@/assets/icons/upload.svg?react";
import File from "@/assets/icons/file.svg?react";
import Mail from "@/assets/icons/mail.svg?react";
import Clipboard from "@/assets/icons/clipboard.svg?react";
import FileSearch from "@/assets/icons/fileSearch.svg?react";

const navigationItem = [
  {
    text: "세금 계산서 업로드",
    url: "/upload",
    icon: Upload,
  },
  {
    text: "홈택스 검증결과",
    url: "/validation",
    icon: File,
  },
  {
    text: "지급결의서 요청",
    url: "/request",
    icon: Mail,
  },
  {
    text: "지급결의서 결재",
    url: "/approve",
    icon: Clipboard,
  },
  {
    text: "내역 통합 조회",
    url: "/history",
    icon: FileSearch,
  },
];

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (url: string) => {
    if (location.pathname === url) return;
    navigate(url);
  };

  return (
    <>
      <nav className="w-full h-[70px] flex gap-[10px] px-5 py-[15px] items-center bg-secondary-500">
        {navigationItem.map(({ text, url, icon: Icon }) => (
          <div
            key={text}
            className={`group flex items-center justify-center gap-2 px-5 py-3 hover:bg-secondary-300 hover:rounded-xl text-secondary-50 hover:text-white 
          ${location.pathname === url && "bg-secondary-300 rounded-xl text-white"}`}
            onClick={() => {
              handleClick(url);
            }}
          >
            <Icon />
            <span
              className={`${location.pathname === url ? "font-bold text-b1" : "text-b2 font-semibold group-hover:font-bold"}`}
            >
              {text}
            </span>
          </div>
        ))}
      </nav>
      <header className="flex justify-between w-full px-[30px] py-2 border-b border-b-grayScale-200">
        <img
          src="/assets/logo.svg"
          alt="서울우유협동조합"
          onClick={() => handleClick("/")}
        />
        <div
          className={`flex gap-2 px-3 py-2 rounded-xl hover:bg-grayScale-50 ${location.pathname === "/my" && "bg-grayScale-50"}`}
          onClick={() => {
            handleClick("/my");
          }}
        >
          <img src="/assets/profile.svg" alt="마이페이지" />
          <span className="font-semibold text-b2 text-grayScale-500">
            마이페이지
          </span>
        </div>
      </header>
    </>
  );
};

export default NavigationBar;
