import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/routes.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <Toaster richColors />
  </QueryClientProvider>
  // </StrictMode>
);
