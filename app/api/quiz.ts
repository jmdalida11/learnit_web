import { api } from "./api";
import { getCsrfTokenRequest } from "./auth";

export const getAllMyQuizzesRequest = () => {
  return api.get(`/quiz`);
};

export const getQuizByIdRequest = (quizId: string) => {
  return api.get(`/quiz/${quizId}`);
};

export const createQuizRequest = async (body: { title: string }) => {
  const { csrfToken } = await getCsrfTokenRequest();
  return api.post(`/quiz`, { csrfToken, body });
};

export const deleteQuizRequest = async (quizId: string) => {
  const { csrfToken } = await getCsrfTokenRequest();
  return api.delete(`/quiz/${quizId}`, { csrfToken });
};
