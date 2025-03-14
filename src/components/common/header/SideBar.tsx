import { navigationItems } from "@/constants/navigation";
import { roleNames, useUserStore } from "@/stores/useUserStore";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, name } = useUserStore();

  const filteredNavItems = navigationItems.filter((item) =>
    item.roles.includes(role)
  );

  const handleClick = (url: string) => {
    if (location.pathname === url) return;
    navigate(url);
  };

  return (
    <>
      <div className="fixed left-0 top-0 flex flex-col w-[240px] h-screen px-6 py-[50px] border-r border-r-grayScale-200 justify-between overflow-hidden bg-white">
        <div className="flex flex-col gap-9">
          <img src="/assets/icons/logo.svg" alt="logo" />
          <div className="flex flex-col gap-2">
            {filteredNavItems.map(({ text, url, icon: Icon }) => (
              <div
                key={text}
                className={`group flex items-center gap-2 px-4 py-3 w-[192px] text-grayScale-600 rounded-xl
          ${location.pathname === url ? "bg-secondary-25 text-secondary-500" : "hover:bg-grayScale-50"}`}
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
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div
            className={`flex px-3 py-2 rounded-xl hover:bg-grayScale-50 ${location.pathname === "/my" && "bg-grayScale-50"}`}
          >
            <span className="b4 text-grayScale-500">{name}</span>
          </div>
          <div className="px-3 py-[2px] border-secondary-500 border rounded-xl b5 text-secondary-500">
            {roleNames[role]}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
