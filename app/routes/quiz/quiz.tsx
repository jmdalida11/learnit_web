import { useParams } from "react-router";
import SkeletonLoader from "~/components/loader/skeletonLoader";
import { useQueryQuiz } from "~/queries/quiz/quiz";

const Quiz = () => {
  const params = useParams();
  const quizId = params["quizId"] as string;

  const { data: quiz, isPending } = useQueryQuiz({ quizId });

  if (isPending) {
    return <SkeletonLoader />;
  }

  if (!quiz) {
    return <div>Quiz not Found</div>;
  }

  return (
    <div>
      <h1 className="font-bold">{quiz.title}</h1>
    </div>
  );
};

export default Quiz;
