import SideBar from "@/components/common/header/SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex w-full h-screen">
      <SideBar />

      <div className="flex flex-col flex-1 min-w-0 ml-[240px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
