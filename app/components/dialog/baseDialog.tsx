import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { ReactNode } from "react";

interface Props {
  open: boolean;
  title: string;
  children: ReactNode;
}

const BaseDialog = ({ open, title, children }: Props) => {
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => {}}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 z-0 bg-black/50  transition-opacity duration-300 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative z-10 w-full max-w-md rounded-xl bg-white/5 backdrop-blur-2xl p-6 duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="text-lg font-semibold text-white">
              {title}
            </DialogTitle>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default BaseDialog;
