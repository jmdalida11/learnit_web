import { create } from "zustand";

type State = {
  isLoading: boolean;
  isCreateDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
};

type Action = {
  openCreateDialog: () => void;
  closeCreateDialog: () => void;
  openDeleteDialog: () => void;
  closeDeleteDialog: () => void;
  setLoading: (v: boolean) => void;
};

const useNoteStore = create<State & Action>((set) => ({
  isCreateDialogOpen: false,
  isDeleteDialogOpen: false,
  isLoading: false,
  setLoading: (v: boolean) => set(() => ({ isLoading: v })),
  openCreateDialog: () => set(() => ({ isCreateDialogOpen: true })),
  closeCreateDialog: () => set(() => ({ isCreateDialogOpen: false })),
  openDeleteDialog: () => set(() => ({ isDeleteDialogOpen: true })),
  closeDeleteDialog: () => set(() => ({ isDeleteDialogOpen: false })),
}));

export default useNoteStore;
