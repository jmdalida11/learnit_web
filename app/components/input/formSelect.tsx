import { Field, Label, Select, Description } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { ComponentProps } from "react";
import type { FieldError } from "react-hook-form";
import { cn } from "~/utils/cn";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends ComponentProps<"select"> {
  label: string;
  options: Option[];
  error?: FieldError;
  description?: string;
}

const FormSelect = ({
  label,
  options,
  error,
  description,
  ...props
}: FormSelectProps) => {
  return (
    <Field className="fieldset">
      <Label className="fieldset-legend text-base">{label}</Label>
      {description && (
        <Description className="text-sm text-gray-500">
          {description}
        </Description>
      )}
      <div className="relative">
        <Select
          {...props}
          className={cn(
            "select select-bordered w-full appearance-none pr-8",
            props.className,
            !!error && "select-error",
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
      <p className="label text-red-500">{error?.message}</p>
    </Field>
  );
};

export default FormSelect;
