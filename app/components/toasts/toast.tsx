import { useEffect } from "react";

interface ToastProps {
  variant: "success" | "info" | "error";
  message: string;
}

const Toast = ({ variant, message }: ToastProps) => {
  return (
    <div className="toast">
      <div className={`alert alert-${variant}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
