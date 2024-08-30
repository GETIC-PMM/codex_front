import { createBrowserRouter } from "react-router-dom";
import SiteLayout from "@/components/layout/siteLayout/siteLayout";
import Homepage from "@/pages/homepage";
import Busca from "@/pages/busca";
import AdminLayout from "@/components/layout/adminLayout/adminLayout";
import AdminHome from "@/pages/adminHome";

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/busca",
        element: <Busca />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/painel",
        element: <AdminHome />,
      },
    ],
  },
]);
