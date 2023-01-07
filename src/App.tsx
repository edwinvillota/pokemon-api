import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BasicLayout } from "./components/layouts/BasicLayout/BasicLayout";
import { Details } from "./pages/Details";
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
      {
        path: "details/:name",
        element: <Details />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
