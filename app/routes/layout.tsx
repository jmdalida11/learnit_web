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
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 px-5 md:px-10 my-5 overflow-y-auto">
        <Outlet />
        <ToastComponent toasts={toasts} />
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800 opacity-50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
