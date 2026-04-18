import { Button } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { createQuizRequest } from "~/api/quiz";
import FormInput from "~/components/input/formInput";
import {
  QUESTION_TYPES,
  QuizQueryKey,
  type Question,
} from "~/queries/quiz/types";
import useLoadingStore from "~/store/useLoadingStore";
import useToastStore from "~/store/useToastStore";
import QuestionFormList from "./questionFormList";

const questionSchema = z.object({
  question: z.string().trim().min(1, "Question is required"),
  type: z.enum(QUESTION_TYPES),
  options: z.string().optional(),
  correctAnswer: z.string().trim().min(1, "Correct answer is required"),
});

const quizSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255),
  questions: z.array(questionSchema),
});

type QuizFormData = z.infer<typeof quizSchema>;

type QuizSubmitData = {
  title: string;
  questions: Array<Omit<Question, "id">>;
};

const CreateQuiz = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    control,
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const { isLoading, setLoading } = useLoadingStore();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<QuizFormData> = async (data) => {
    try {
      setLoading(true);

      const payload: QuizSubmitData = {
        title: data.title,
        questions: data.questions.map((question) => ({
          question: question.question,
          type: question.type,
          options: question.options
            ? question.options
                .split(",")
                .map((option) => option.trim())
                .filter(Boolean)
            : undefined,
          correctAnswer: question.correctAnswer,
        })),
      };

      const { message, id } = await createQuizRequest(payload);
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
      <div className="flex justify-between">
        <h1>Create New Quiz</h1>
        <Button
          type="button"
          className="btn btn-ghost"
          onClick={() =>
            append({
              question: "",
              type: "short_answer",
              options: "",
              correctAnswer: "",
            })
          }
        >
          <span>Add Question</span>
          <PlusCircleIcon className="size-6" />
        </Button>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label={"Title"}
            error={errors.title}
            {...register("title")}
          />
          <QuestionFormList
            fields={fields}
            register={register}
            errors={errors}
            watch={watch}
            onRemoveQuestion={remove}
          />
          <div className="mt-3">
            <Button
              className="btn"
              type="submit"
              disabled={isLoading || fields.length === 0}
            >
              Create Quiz
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
