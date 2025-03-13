import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { Role } from "@/stores/useUserStore";

const UserSession = () => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (email && role && name && accessToken && refreshToken) {
      setUser({
        id: email,
        name,
        email,
        role: role as Role,
      });
    } else {
      console.log("No user session found in local storage.");
    }
  }, [setUser]);

  return null;
};

export default UserSession;
