import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import MyPage from "@/pages/MyPage";
import LoginPage from "@/pages/LoginPage";
import VerifyPage from "@/pages/VerifyPage";
import SubmitPage from "@/pages/SubmitPage";
import RegisterPage from "@/pages/AddUserPage";
import UsersPage from "@/pages/UsersPage";
import LookupPage from "@/pages/LookupPage";
import CertPage from "@/pages/CertPage";

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "verify", element: <VerifyPage /> },
      { path: "submit", element: <SubmitPage /> },
      { path: "addUser", element: <RegisterPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "lookup", element: <LookupPage /> },
      { path: "cert", element: <CertPage /> },
      { path: "my", element: <MyPage /> },
    ],
  },
]);
