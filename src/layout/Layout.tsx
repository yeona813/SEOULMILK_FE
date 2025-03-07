import NavigationBar from "@/components/common/header/NavigationBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default Layout;
