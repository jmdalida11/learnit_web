import { Outlet } from "react-router";
import Navbar from "./navbar";
import { useCheckAuth } from "~/hooks/useCheckAuth";

const Layout = () => {
  useCheckAuth();

  return (
    <div>
      <Navbar />
      <div className="px-10 mt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
