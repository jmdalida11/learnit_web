import { useQuery } from "@tanstack/react-query";
import { QuizQueryKey, type Quiz } from "./types";
import { getAllMyQuizzesRequest } from "~/api/quiz";

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
