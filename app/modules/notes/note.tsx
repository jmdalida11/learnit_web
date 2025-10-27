import { useQueryClient } from "@tanstack/react-query";
import { lazy, useState } from "react";
import { updateNoteRequest } from "~/api/notes";
import { NoteQueryKey, type Note } from "~/queries/notes/types";
import useLoadingStore from "~/store/useLoadingStore";
import useToastStore from "~/store/useToastStore";

const NoteEditor = lazy(
  () => import("~/components/richTextEditor/richTextEditor")
);

interface NoteProps {
  note: Note;
}

const NoteComponent = ({ note }: NoteProps) => {
  const { setLoading } = useLoadingStore();
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();
  const [editorValue, setEditorValue] = useState(note.content);

  const handleSaveNote = async () => {
    setLoading(true);
    try {
      const { message } = await updateNoteRequest(note.id, {
        content: editorValue,
      });
      queryClient.invalidateQueries({
        queryKey: [NoteQueryKey.Note],
      });
      queryClient.invalidateQueries({
        queryKey: [NoteQueryKey.Notes],
      });
      addToast(message, "success");
    } catch (e) {
      addToast((e as any)?.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-extrabold font-mono text-3xl">{note.title}</h1>
      </div>
      <NoteEditor value={editorValue} setValue={setEditorValue} />
      <div className="py-3 flex justify-end">
        <button className="btn btn-primary" onClick={handleSaveNote}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NoteComponent;
