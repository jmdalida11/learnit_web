import { Button } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import FormInput from "~/components/input/formInput";
import FormSelect from "~/components/input/formSelect";
import type { QuestionType } from "~/queries/quiz/types";

interface Props {
  fields: Array<{ id: string }>;
  register: any;
  errors: any;
  watch: any;
  onRemoveQuestion: (index: number) => void;
}

const QuestionFormList = ({
  fields,
  register,
  errors,
  watch,
  onRemoveQuestion,
}: Props) => {
  const questionTypes = [
    { value: "multiple_choice", label: "Multiple choice" },
    { value: "multiple_answer", label: "Multiple answer" },
    { value: "true_false", label: "True / False" },
    { value: "short_answer", label: "Short answer" },
  ];

  return (
    <div className="space-y-4">
      {fields.length === 0 ? (
        <p className="text-sm text-gray-500">
          Add at least one question to create your quiz.
        </p>
      ) : (
        fields.map((field, index) => {
          const questionType = watch(`questions.${index}.type`) as QuestionType;

          return (
            <div
              key={field.id}
              className="card bg-base-100 border border-base-200 p-4"
            >
              <div className="flex items-center justify-between mb-4 gap-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Question {index + 1}
                  </h2>
                </div>
                <Button
                  type="button"
                  className="btn btn-sm btn-outline btn-error"
                  onClick={() => onRemoveQuestion(index)}
                >
                  <TrashIcon className="size-5" />
                </Button>
              </div>

              <FormInput
                label="Question"
                error={errors.questions?.[index]?.question as any}
                {...register(`questions.${index}.question` as const)}
              />

              <div className="grid gap-3 md:grid-cols-2">
                <FormSelect
                  label="Type"
                  options={questionTypes}
                  error={errors.questions?.[index]?.type}
                  {...register(`questions.${index}.type` as const)}
                />
                <FormInput
                  label="Correct Answer"
                  error={errors.questions?.[index]?.correctAnswer as any}
                  {...register(`questions.${index}.correctAnswer` as const)}
                />
              </div>
              {questionType === "multiple_choice" && (
                <FormInput
                  label="Options"
                  error={errors.questions?.[index]?.options as any}
                  {...register(`questions.${index}.options` as const)}
                  placeholder="Comma-separated options"
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default QuestionFormList;
