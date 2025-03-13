import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import MyPage from "@/pages/MyPage";
import LoginPage from "@/pages/LoginPage";
import VerifyPage from "@/pages/VerifyPage";
import SubmitPage from "@/pages/SubmitPage";
import CertPage from "@/pages/CertPage";
import AddUserPage from "@/pages/AddUserPage";
import AdminHubPage from "@/pages/AdminHubPage";
import EmployeePW from "@/pages/EmployeePW";
import EmployeeLookupPage from "@/pages/EmployeeLookupPage";
import InvitePage from "@/pages/InvitePage";

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/employeePW", element: <EmployeePW /> },
  { path: "/invite", element: <InvitePage /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "verify", element: <VerifyPage /> },
      { path: "submit", element: <SubmitPage /> },
      { path: "addUser", element: <AddUserPage /> },
      { path: "cert", element: <CertPage /> },
      { path: "my", element: <MyPage /> },
      { path: "adminHub", element: <AdminHubPage /> },
      { path: "employee-lookup", element: <EmployeeLookupPage /> },
    ],
  },
]);
