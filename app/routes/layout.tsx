import { Outlet } from "react-router";
import Navbar from "./navbar";
import { useCheckAuth } from "~/hooks/useCheckAuth";

const Layout = () => {
  useCheckAuth();

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
