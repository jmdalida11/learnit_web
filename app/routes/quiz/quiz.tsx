import { useParams } from "react-router";
import SkeletonLoader from "~/components/loader/skeletonLoader";
import { useQueryQuiz } from "~/queries/quiz/quiz";
import type { QuestionType } from "~/queries/quiz/types";

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

  const renderAnswerInput = (qType: QuestionType) => {
    if (qType === "true_false") {
      return (
        <div>
          <span className="mr-3">
            True: <input type="radio" name="radio-1" className="radio" />
          </span>
          <span className="mr-3">
            False: <input type="radio" name="radio-1" className="radio" />
          </span>
        </div>
      );
    }
    return <input className="input input-sm" />;
  };

  return (
    <div>
      <h1 className="font-bold">{quiz.title}</h1>
      <div>Attemps: {quiz.attempts}</div>
      <div>Average Score: {quiz.averageScore}</div>
      <div className="mt-5">
        <h1>Questions:</h1>
        {quiz.questions?.map((q, idx) => (
          <div className="collapse bg-base-100 border border-base-300 mt-3">
            <input type="checkbox" />
            <div className="collapse-title font-semibold">
              {idx + 1}. {q.question}
            </div>
            <div className="collapse-content text-sm">
              {renderAnswerInput(q.type)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
