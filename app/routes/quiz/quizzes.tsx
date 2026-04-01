import { Button } from "@headlessui/react";
import AcademicCapIcon from "@heroicons/react/24/solid/AcademicCapIcon";
import SkeletonLoader from "~/components/loader/skeletonLoader";
import { useQueryQuizzes } from "~/queries/quiz/quiz";
import { formatStringDate } from "~/utils/date";

const Quizzes = () => {
  const { quizzes, isPending } = useQueryQuizzes();

  if (isPending) {
    return <SkeletonLoader />;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="flex gap-1">
          <span>My Quizzes</span>
          <AcademicCapIcon className="size-6" />
        </h1>
        <Button className="btn">Add new quiz</Button>
      </div>
      <div>
        <div className="overflow-x-auto mt-5">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>Title</th>
                <th>Categories</th>
                <th>Attempts</th>
                <th>Average Score</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr>
                  <td>{quiz.title}</td>
                  <td>{quiz.categories.join(",")}</td>
                  <td>{quiz.attempts}</td>
                  <td>{quiz.averageScore}</td>
                  <td>{formatStringDate(quiz.createdAt)}</td>
                  <td>{formatStringDate(quiz.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
