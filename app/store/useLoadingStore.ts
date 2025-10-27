import { create } from "zustand";

type State = {
  isLoading: boolean;
};

type Action = {
  setLoading: (loading: boolean) => void;
};

const useLoadingStore = create<State & Action>((set) => ({
  isLoading: false,
  setLoading: (loading: boolean) => set(() => ({ isLoading: loading })),
}));

export default useLoadingStore;
