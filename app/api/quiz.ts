import type { Question } from "~/queries/quiz/types";
import { api } from "./api";
import { getCsrfTokenRequest } from "./auth";

export type CreateQuizRequestBody = {
  title: string;
  questions: Array<Omit<Question, "id">>;
};

export const getAllMyQuizzesRequest = () => {
  return api.get(`/quiz`);
};

export const getQuizByIdRequest = (quizId: string) => {
  return api.get(`/quiz/${quizId}`);
};

export const createQuizRequest = async (body: CreateQuizRequestBody) => {
  const { csrfToken } = await getCsrfTokenRequest();
  return api.post(`/quiz`, { csrfToken, body });
};

export const deleteQuizRequest = async (quizId: string) => {
  const { csrfToken } = await getCsrfTokenRequest();
  return api.delete(`/quiz/${quizId}`, { csrfToken });
};
