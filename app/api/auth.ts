import { api } from "./api";

type SignUpBody = {
  username: string;
  password: string;
  name: string;
  email: string;
};

export const signUpRequest = (body: SignUpBody) => {
  return api.post("/user", { body });
};

type LoginBody = {
  username: string;
  password: string;
};

export const loginRequest = (body: LoginBody) => {
  return api.post("/auth/login", { body });
};

export const logoutRequest = async () => {
  const { csrfToken } = await getCsrfTokenRequest();
  return api.post("/auth/logout", { csrfToken });
};

export const getCsrfTokenRequest = () => {
  return api.get("/auth/csrf-token");
};
