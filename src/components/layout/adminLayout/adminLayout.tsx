import { useState } from "react";
import Navbar from "./partials/navbar";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import Header from "./partials/header";
import AuthProviderKC from "@/services/useAuth";

const AdminLayout = () => {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  return (
    <AuthProviderKC>
      <Header setIsNavbarExpanded={setIsNavbarExpanded} />
      <Navbar
        setIsNavbarExpanded={setIsNavbarExpanded}
        isNavbarExpanded={isNavbarExpanded}
      />
      <main>
        <div className={cn("md:mx-24 mt-20 mb-14 px-4 md:px-0 ")}>
          <Outlet />
        </div>
      </main>
    </AuthProviderKC>
  );
};

export default AdminLayout;
