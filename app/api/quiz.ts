import { api } from "./api";
import { getCsrfTokenRequest } from "./auth";

export const getAllMyQuizzesRequest = () => {
  return api.get(`/quiz`);
};
