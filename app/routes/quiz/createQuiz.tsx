import { Button } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { createQuizRequest } from "~/api/quiz";
import FormInput from "~/components/input/formInput";
import { QuizQueryKey } from "~/queries/quiz/types";
import useLoadingStore from "~/store/useLoadingStore";
import useToastStore from "~/store/useToastStore";

const quizSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255),
});

type QuizFormData = z.infer<typeof quizSchema>;

const CreateQuiz = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
  });
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const { isLoading, setLoading } = useLoadingStore();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<QuizFormData> = async (data) => {
    try {
      setLoading(true);
      const { message, id } = await createQuizRequest(data);
      queryClient.invalidateQueries({
        queryKey: [QuizQueryKey.Quizzes],
      });
      addToast(message, "success");
      navigate(`/quiz/${id}`, { replace: true });
    } catch (error: any) {
      addToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create New Quiz</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label={"Title"}
            error={errors.title}
            {...register("title")}
          />
          <div className="mt-3">
            <Button className="btn" type="submit" disabled={isLoading}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
