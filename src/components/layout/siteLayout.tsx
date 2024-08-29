import Header from "../partials/header";
import { Outlet } from "react-router-dom";

const SiteLayout = () => {
  return (
    <div className="flex items-center flex-col">
      <div className="w-full max-w-[1400px]">
        <Header />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SiteLayout;
