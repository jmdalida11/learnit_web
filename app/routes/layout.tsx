import { Outlet } from "react-router";
import Navbar from "./navbar";
import { useCheckAuth } from "~/hooks/useCheckAuth";
import useLoadingStore from "~/store/useLoadingStore";
import ToastComponent from "~/components/toasts/toast";
import useToastStore from "~/store/useToastStore";

const Layout = () => {
  useCheckAuth();
  const { isLoading } = useLoadingStore();
  const { toasts } = useToastStore();

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="px-10 mt-20 mb-5">
        <Outlet />
        <ToastComponent toasts={toasts} />
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800 opacity-50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
