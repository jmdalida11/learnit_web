import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createNoteRequest } from "~/api/note";
import FormInput from "~/components/input/formInput";
import { NoteQueryKey } from "~/queries/notes/types";
import useNoteStore from "~/store/useNoteStore";
import useToastStore from "~/store/useToastStore";

const CreateNoteDialog = () => {
  const { addToast } = useToastStore();
  const { isCreateDialogOpen, isLoading, closeCreateDialog, setLoading } =
    useNoteStore();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: { title: string }) => {
    try {
      setLoading(true);
      const { message } = await createNoteRequest(data);
      queryClient.invalidateQueries({
        queryKey: [NoteQueryKey.Notes],
      });
      closeCreateDialog();
      reset();
      addToast(message, "success");
    } catch (error: any) {
      addToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isCreateDialogOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => {}}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 z-0 bg-black/50  transition-opacity duration-300 ease-out data-closed:opacity-0"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="relative z-10 w-full max-w-md rounded-xl bg-white/5 backdrop-blur-2xl p-6 duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-lg font-semibold text-white">
                Create Note
              </DialogTitle>
              <FormInput
                label={"Note Title"}
                {...register("title", {
                  required: "This is required",
                })}
                error={errors.title}
                className="bg-white text-black"
                autoFocus
              />
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  className="inline-flex items-center gap-2 rounded-md btn btn-primary px-4 py-2 text-sm font-semibold text-white"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    "Create"
                  )}
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md btn px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
                  onClick={() => {
                    closeCreateDialog();
                    reset();
                  }}
                  disabled={isLoading}
                >
                  Close
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default CreateNoteDialog;
