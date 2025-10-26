import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getCsrfTokenRequest } from "~/api/auth";

export const useCheckAuth = (reverse = false) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCsrfTokenRequest();
        if (reverse) {
          navigate("/");
        }
      } catch (error) {
        if (!reverse) {
          navigate("/login");
        }
      }
    };
    checkAuth();
  }, []);
};
