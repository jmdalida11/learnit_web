import {
  Controller,
  type FieldError,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { Field, Input } from "@chakra-ui/react";

interface ControlledInputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  type?: string;
  error?: FieldError;
}

const ControlledInput = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  type,
  error,
}: ControlledInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Field.Root invalid={!!error}>
          <Field.Label>{label}</Field.Label>
          <Input {...field} type={type} />
          <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
      )}
    />
  );
};

export default ControlledInput;
