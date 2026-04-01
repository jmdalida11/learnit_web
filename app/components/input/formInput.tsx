import { Field, Input, Label } from "@headlessui/react";
import type { ComponentProps } from "react";
import type { FieldError } from "react-hook-form";
import { cn } from "~/utils/cn";

interface FormInputProps extends ComponentProps<"input"> {
  label: string;
  error?: FieldError;
}

const FormInput = ({ label, error, ...props }: FormInputProps) => {
  return (
    <Field className="fieldset">
      <Label className="fieldset-legend text-base">{label}</Label>
      <Input
        autoComplete={props?.name}
        {...props}
        className={cn(
          "input w-full",
          props.className,
          !!error && "input-error",
        )}
      />
      <p className={"label text-red-500"}>{error?.message}</p>
    </Field>
  );
};

export default FormInput;
