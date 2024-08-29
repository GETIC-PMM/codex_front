import { createBrowserRouter } from "react-router-dom";
import SiteLayout from "@/components/layout/siteLayout/siteLayout";
import Homepage from "@/pages/homepage";

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
    ],
  },
]);