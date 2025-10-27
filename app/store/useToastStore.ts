import { create } from "zustand";

type ToastStatus = "success" | "error";

export type Toast = {
  id: string;
  message: string;
  status: ToastStatus;
};

type State = {
  toasts: Toast[];
};

type Action = {
  addToast: (message: string, status: ToastStatus) => void;
};

const useToastStore = create<State & Action>((set) => ({
  toasts: [],
  addToast: (message: string, status: ToastStatus) => {
    const id = crypto.randomUUID();
    set((prev: State) => ({
      ...prev,
      toasts: [...prev.toasts, { id, message, status }],
    }));
    setTimeout(() => {
      set((prev) => ({
        ...prev,
        toasts: prev.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },
}));

export default useToastStore;
