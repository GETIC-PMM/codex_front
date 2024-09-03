import { createBrowserRouter } from "react-router-dom";
import SiteLayout from "@/components/layout/siteLayout/siteLayout";
import Homepage from "@/pages/homepage";
import Busca from "@/pages/busca";
import AdminLayout from "@/components/layout/adminLayout/adminLayout";
import AdminHome from "@/pages/adminHome";
import Treinamentos from "@/pages/treinamentos/treinamentos";
import Categorias from "@/pages/categorias/categorias";
import Tags from "@/pages/tags";
import NovoTreinamento from "@/pages/treinamentos/new";

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
      {
        path: "/painel/treinamentos",
        element: <Treinamentos />,
      },
      {
        path: "/painel/treinamentos/novo",
        element: <NovoTreinamento />,
      },
      {
        path: "/painel/categorias",
        element: <Categorias />,
      },
      {
        path: "/painel/tags",
        element: <Tags />,
      },
    ],
  },
]);
