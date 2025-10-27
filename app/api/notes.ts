import type { Note } from "~/queries/notes/types";
import { api } from "./api";
import { getCsrfTokenRequest } from "./auth";

export const getAllMyNotesRequest = () => {
  return api.get("/note");
};

export const getNoteByIdRequest = (noteId: string) => {
  return api.get(`/note/${noteId}`);
};

export const updateNoteRequest = async (
  noteId: string,
  note: Pick<Note, "content">
) => {
  const { csrfToken } = await getCsrfTokenRequest();
  return api.patch(`/note/${noteId}`, { csrfToken, body: { ...note } });
};
