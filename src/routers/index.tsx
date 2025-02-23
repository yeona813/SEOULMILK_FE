import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import UploadPage from "@/pages/UploadPage";
import ValidationPage from "@/pages/ValidationPage";
import RequestPage from "@/pages/RequestPage";
import ApprovePage from "@/pages/ApprovePage";
import HistoryPage from "@/pages/HistoryPage";
import MyPage from "@/pages/MyPage";
import LoginPage from "@/pages/LoginPage";

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "upload",
        element: <UploadPage />,
      },
      {
        path: "validation",
        element: <ValidationPage />,
      },
      {
        path: "request",
        element: <RequestPage />,
      },
      {
        path: "approve",
        element: <ApprovePage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      { path: "my", element: <MyPage /> },
    ],
  },
]);
