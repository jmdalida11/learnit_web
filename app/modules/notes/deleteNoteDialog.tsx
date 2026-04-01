import { deleteNoteRequest } from "~/api/note";
import { useNavigate } from "react-router";
import useNoteStore from "~/store/useNoteStore";
import useLoadingStore from "~/store/useLoadingStore";
import useToastStore from "~/store/useToastStore";
import { NoteQueryKey } from "~/queries/notes/types";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmDeleteDialog from "~/components/dialog/confirmDeleteDialog";

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
    <ConfirmDeleteDialog
      open={isDeleteDialogOpen}
      title="Delete Note"
      handleDelete={handleDelete}
      handleCancel={closeDeleteDialog}
    />
  );
};

export default DeleteNoteDialog;
