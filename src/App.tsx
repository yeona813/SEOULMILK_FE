import { RouterProvider } from "react-router-dom";
import { router } from "./routers"; // 라우터 경로에 맞게 import
import UserSession from "./UserSession";

function App() {
  return (
    <>
      <UserSession />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
