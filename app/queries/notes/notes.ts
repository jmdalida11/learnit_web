import { useQuery } from "@tanstack/react-query";
import { NoteQueryKey, type Note } from "./types";
import { getAllMyNotesRequest, getNoteByIdRequest } from "~/api/notes";

export const useQueryNotes = () => {
  return useQuery<Note[]>({
    queryKey: [NoteQueryKey.Notes],
    queryFn: () => {
      return getAllMyNotesRequest();
    },
  });
};

export const useQueryNote = ({ noteId }: { noteId: string }) => {
  return useQuery<Note>({
    queryKey: [NoteQueryKey.Note, noteId],
    queryFn: () => {
      return getNoteByIdRequest(noteId);
    },
  });
};
