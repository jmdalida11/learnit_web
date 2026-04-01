import { useQuery } from "@tanstack/react-query";
import { QuizQueryKey, type Quiz } from "./types";
import { getAllMyQuizzesRequest, getQuizByIdRequest } from "~/api/quiz";

export const useQueryQuizzes = () => {
  const { data, isPending } = useQuery<Quiz[]>({
    queryKey: [QuizQueryKey.Quizzes],
    queryFn: () => {
      return getAllMyQuizzesRequest();
    },
  });

  return {
    quizzes: data ?? [],
    isPending,
  };
};

export const useQueryQuiz = ({ quizId }: { quizId: string }) => {
  return useQuery<Quiz>({
    queryKey: [QuizQueryKey.Quiz, quizId],
    queryFn: () => {
      return getQuizByIdRequest(quizId);
    },
  });
};
