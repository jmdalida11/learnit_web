import { useQueryClient } from "@tanstack/react-query";
import { lazy, useEffect, useRef, useState } from "react";
import { updateNoteRequest } from "~/api/notes";
import { NoteQueryKey, type Note } from "~/queries/notes/types";
import useLoadingStore from "~/store/useLoadingStore";
import useNoteStore from "~/store/useNoteStore";
import useToastStore from "~/store/useToastStore";
import DeleteNoteDialog from "./deleteNoteDialog";

const NoteEditor = lazy(
  () => import("~/components/richTextEditor/richTextEditor"),
);

interface NoteProps {
  note: Note;
}

const NoteComponent = ({ note }: NoteProps) => {
  const { setLoading } = useLoadingStore();
  const { addToast } = useToastStore();
  const { openDeleteDialog } = useNoteStore();

  const queryClient = useQueryClient();

  const [editorValue, setEditorValue] = useState(note.content);
  const titleRef = useRef<HTMLInputElement | null>(null);

  const handleSaveNote = async () => {
    setLoading(true);
    try {
      const { message } = await updateNoteRequest(note.id, {
        title: titleRef.current?.value || note.title,
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

  const handleDeleteNote = async () => {
    openDeleteDialog();
  };

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.value = note.title;
    }
  }, [note]);

  return (
    <div>
      <div className="mb-5">
        <input
          ref={titleRef}
          className="ont-extrabold font-mono text-3xl w-full"
          onBlur={() => {
            if (titleRef.current?.value === "") {
              titleRef.current.value = note.title;
            }
          }}
        />
      </div>
      <NoteEditor
        value={editorValue}
        setValue={setEditorValue}
        placeholder="Write your note here!"
        className="bg-[#E8E4C9] text-black"
      />
      <div className="py-3 flex justify-end">
        <button className="btn btn-primary" onClick={handleSaveNote}>
          Save
        </button>
        <button className="btn btn-error ml-1" onClick={handleDeleteNote}>
          Delete
        </button>
      </div>
      <DeleteNoteDialog noteId={note.id} />
    </div>
  );
};

export default NoteComponent;
