export enum NoteQueryKey {
  Notes = "Notes",
  Note = "Note",
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[] | null;
  isShared: boolean;
  createdAt: string;
  updatedAt: string;
}
