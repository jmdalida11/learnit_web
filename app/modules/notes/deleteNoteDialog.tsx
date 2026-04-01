import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { deleteNoteRequest } from "~/api/note";
import { useNavigate } from "react-router";
import useNoteStore from "~/store/useNoteStore";
import useLoadingStore from "~/store/useLoadingStore";
import useToastStore from "~/store/useToastStore";
import { NoteQueryKey } from "~/queries/notes/types";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteNoteDialogProps {
  noteId: string;
}

const DeleteNoteDialog = ({ noteId }: DeleteNoteDialogProps) => {
  const { setLoading } = useLoadingStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isDeleteDialogOpen, closeDeleteDialog } = useNoteStore();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const { message } = await deleteNoteRequest(noteId);
      queryClient.invalidateQueries({
        queryKey: [NoteQueryKey.Notes],
      });
      addToast(message, "success");
      navigate("/");
    } catch (error: any) {
      addToast(error.message, "error");
    } finally {
      setLoading(false);
      closeDeleteDialog();
    }
  };

  return (
    <Dialog
      open={isDeleteDialogOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => {}}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 z-0 bg-black/50  transition-opacity duration-300 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative z-10 w-full max-w-md rounded-xl bg-white/5 backdrop-blur-2xl p-6 duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="text-lg font-semibold text-white">
              Delete Note
            </DialogTitle>
            <p className="py-4">
              Are you sure you want to delete this note? This action cannot be
              undone.
            </p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
              <button className="btn" onClick={closeDeleteDialog}>
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteNoteDialog;
