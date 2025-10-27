import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import type { Toast } from "~/store/useToastStore";
import { cn } from "~/utils/cn";

const ToastComponent = ({ toasts }: { toasts: Toast[] }) => {
  return (
    <div className="toast toast-bottom">
      {toasts.map((toast) => (
        <Transition
          key={toast.id}
          as={Fragment}
          appear
          show
          enter="transform transition ease-out duration-300"
          enterFrom="translate-y-2 opacity-0 scale-95"
          enterTo="translate-y-0 opacity-100 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className={cn(
              "alert",
              toast.status === "success" && "alert-success",
              toast.status === "error" && "alert-error"
            )}
          >
            {toast.message}
          </div>
        </Transition>
      ))}
    </div>
  );
};

export default ToastComponent;
