import { navigationItems } from "@/constants/navigation";
import { roleNames, useUserStore } from "@/stores/useUserStore";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "../control/Dropdown";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, name } = useUserStore();
  const [openDropdown, setOpenDropdown] = useState(false);

  const filteredNavItems = navigationItems.filter((item) =>
    item.roles.includes(role)
  );

  const handleClick = (url: string) => {
    if (location.pathname === url) return;
    navigate(url);
  };

  return (
    <>
      <nav className="w-full h-[70px] flex gap-[10px] px-5 py-[15px] items-center bg-secondary-500">
        {filteredNavItems.map(({ text, url, icon: Icon }) => (
          <div
            key={text}
            className={`group flex items-center justify-center gap-2 px-5 py-3 hover:bg-secondary-600 hover:rounded-xl text-secondary-50 hover:text-white 
          ${location.pathname === url && "bg-secondary-300 rounded-xl text-white"}`}
            onClick={() => {
              handleClick(url);
            }}
          >
            <Icon />
            <span
              className={`${location.pathname === url ? "b1" : "b2 group-hover:font-bold"}`}
            >
              {text}
            </span>
          </div>
        ))}
      </nav>
      <header className="flex justify-between w-full px-[30px] py-2 border-b border-b-grayScale-200">
        <img
          src="/assets/icons/logo.svg"
          alt="서울우유협동조합"
          onClick={() => handleClick("/")}
        />
        <div className="flex items-center gap-[10px]">
          <div className="px-3 py-[2px] border-secondary-500 border rounded-xl b5 text-secondary-500">
            {roleNames[role]}
          </div>
          <div></div>
          <div
            className={`relative flex gap-5 pl-6 pr-[18px] py-2 rounded-xl hover:bg-grayScale-50 ${location.pathname === "/my" && "bg-grayScale-50"}`}
            onClick={() => {
              setOpenDropdown((prev) => !prev);
            }}
          >
            <span className="b2 text-grayScale-500">{name}</span>
            <img src="/assets/icons/toggle.svg" alt="toggle" />
            {openDropdown && (
              <Dropdown onClose={() => setOpenDropdown(false)} />
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default NavigationBar;
