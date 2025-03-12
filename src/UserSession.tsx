import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { Role } from "@/stores/useUserStore";

const UserSession = () => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const role = localStorage.getItem("role") as Role | null;
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (role && accessToken && refreshToken) {
      if (role === "admin") {
        setUser({ role });
      } else {
        const email = localStorage.getItem("email");
        const name = localStorage.getItem("name");

        if (email && name) {
          setUser({ id: email, name, email, role });
        } else {
          console.log("Incomplete user session data for non-admin role.");
        }
      }
    } else {
      console.log("No valid user session found in local storage.");
    }
  }, [setUser]);

  return null;
};

export default UserSession;
