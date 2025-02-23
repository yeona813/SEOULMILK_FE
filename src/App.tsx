import { RouterProvider } from "react-router-dom";
import { router } from "./routers"; // 라우터 경로에 맞게 import

function App() {
  return <RouterProvider router={router} />;
}

export default App;
