import { api } from "./api";

export const getAllMyNotesRequest = () => {
  return api.get("/note");
};

export const getNoteByIdRequest = (noteId: string) => {
  return api.get(`/note/${noteId}`);
};
