import type { Note } from "~/queries/notes/types";
import { api } from "./api";
import { getCsrfTokenRequest } from "./auth";

export const getAllMyNotesRequest = (page: number, pageSize: number) => {
  return api.get(`/note?page=${page}&pageSize=${pageSize}`);
};

export const getNoteByIdRequest = (noteId: string) => {
  return api.get(`/note/${noteId}`);
};

export const createNoteRequest = async (body: { title: string }) => {
  const { csrfToken } = await getCsrfTokenRequest();
  return api.post(`/note`, { csrfToken, body });
};

export const updateNoteRequest = async (
  noteId: string,
  note: Pick<Note, "content">,
) => {
  const { csrfToken } = await getCsrfTokenRequest();
  return api.patch(`/note/${noteId}`, { csrfToken, body: { ...note } });
};

export const deleteNoteRequest = async (noteId: string) => {
  const { csrfToken } = await getCsrfTokenRequest();
  return api.delete(`/note/${noteId}`, { csrfToken });
};
