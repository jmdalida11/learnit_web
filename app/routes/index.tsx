// import type { Route } from "./+types";

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getCsrfTokenRequest, logoutRequest } from "~/api/auth";

// export function meta({}: Route.MetaArgs) {
//   return [{ title: "Learn It!" }];
// }

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const foo = async () => {
      try {
        const { csrfToken } = await getCsrfTokenRequest();
      } catch (error) {
        navigate("/login");
      }
    };
    foo();
  }, []);

  const logout = () => {
    logoutRequest()
      .then(() => {
        navigate("/login");
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div>
      <h1>Home</h1>
      <button className="btn btn-active" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
