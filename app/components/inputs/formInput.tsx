import type { ComponentProps } from "react";
import type { FieldError } from "react-hook-form";
import { cn } from "~/utils/cn";

interface FormInputProps extends ComponentProps<"input"> {
  label: string;
  error?: FieldError;
}

const FormInput = ({ label, error, ...props }: FormInputProps) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-base">{label}</legend>
      <input
        className={cn("input w-full", !!error && "input-error")}
        autoComplete={props?.name}
        {...props}
      />
      <p className={"label text-red-500"}>{error?.message}</p>
    </fieldset>
  );
};

export default FormInput;
