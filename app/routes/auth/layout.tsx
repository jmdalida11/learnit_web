import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="grid place-items-center h-screen">
      <Outlet />
    </div>
  );
}
