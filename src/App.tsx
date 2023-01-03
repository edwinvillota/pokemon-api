import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BasicLayout } from "./components/layouts/BasicLayout/BasicLayout";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
