import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import InMain from "./Routes/InMain";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "main",
        element: <InMain />,
      },
    ],
  },
]);

export default router;
