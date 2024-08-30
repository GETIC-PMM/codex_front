import Footer from "./partials/footer";
import Header from "./partials/header";
import { Outlet } from "react-router-dom";

const SiteLayout = () => {
  return (
    <div className="flex items-center flex-col">
      <div className={`w-full max-w-[1200px]`}>
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
