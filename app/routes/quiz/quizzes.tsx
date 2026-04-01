import { Button } from "@headlessui/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import AcademicCapIcon from "@heroicons/react/24/solid/AcademicCapIcon";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { deleteQuizRequest } from "~/api/quiz";
import ConfirmDeleteDialog from "~/components/dialog/confirmDeleteDialog";
import SkeletonLoader from "~/components/loader/skeletonLoader";
import { useQueryQuizzes } from "~/queries/quiz/quiz";
import { QuizQueryKey } from "~/queries/quiz/types";
import useLoadingStore from "~/store/useLoadingStore";
import useToastStore from "~/store/useToastStore";
import { formatStringDate } from "~/utils/date";

const Quizzes = () => {
  const navigate = useNavigate();
  const { quizzes, isPending } = useQueryQuizzes();
  const { setLoading } = useLoadingStore();
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState("");

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      setLoading(true);
      const { message } = await deleteQuizRequest(quizId);
      queryClient.invalidateQueries({
        queryKey: [QuizQueryKey.Quizzes],
      });
      setSelectedQuizId("");
      addToast(message, "success");
    } catch (error: any) {
      addToast(error.message, "error");
    } finally {
      setLoading(false);
      setIsDeleteDialogOpen(false);
    }
  };

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
        <Button className="btn" onClick={() => navigate("/quiz/create")}>
          Add New Quiz
        </Button>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr className="hover:bg-base-200">
                  <td>{quiz.title}</td>
                  <td>{quiz.categories.join(",")}</td>
                  <td>{quiz.attempts}</td>
                  <td>{quiz.averageScore}</td>
                  <td>{formatStringDate(quiz.createdAt)}</td>
                  <td>{formatStringDate(quiz.updatedAt)}</td>
                  <td>
                    <Button
                      className="btn btn-ghost hover:bg-amber-500 cursor-pointer"
                      onClick={() => {
                        navigate(`/quiz/${quiz.id}`);
                      }}
                    >
                      <PencilSquareIcon className="size-4" />
                    </Button>
                    <Button
                      className="btn btn-ghost hover:bg-red-500 cursor-pointer"
                      onClick={() => {
                        setSelectedQuizId(quiz.id);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <TrashIcon className="size-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        title="Delete Quiz"
        handleDelete={() => handleDeleteQuiz(selectedQuizId)}
        handleCancel={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
};

export default Quizzes;
