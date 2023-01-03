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
        element: <h1>Test</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
