import Footer from "./partials/footer";
import Header from "./partials/header";
import { Outlet } from "react-router-dom";

const SiteLayout = () => {
  return (
    <div className="flex items-center flex-col h-full">
      <div className={`w-full max-w-[1200px] flex flex-col flex-1`}>
        <Header />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SiteLayout;
