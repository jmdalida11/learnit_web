import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router";
import z from "zod";
import { signUpRequest } from "~/api/auth";
import FormInput from "~/components/input/formInput";
import { cn } from "~/utils/cn";

const signUpSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Minimum length is 3")
    .max(30, "Maximum length is 30"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Minimum length is 8")
    .max(30, "Maximum length is 30")
    .regex(/^\S*$/, "Space is not allowed"),
  name: z.string().min(1, "Name is required").max(255, "Maximum length is 255"),
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const Signup = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastStatus, setToastStatus] = useState<"success" | "error">(
    "success",
  );

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      await signUpRequest(data);

      setToastMessage("Successfully Created!");
      setToastStatus("success");
      reset();
    } catch (error: any) {
      setToastStatus("error");
      setToastMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="card-lg w-96 bg-base-200 shadow-lg">
        {toastMessage && (
          <div
            className={cn(
              `w-full flex justify-center bg-error`,
              toastStatus === "success" && "bg-success",
              toastStatus === "error" && "bg-red-500",
            )}
          >
            {toastMessage}
          </div>
        )}
        <div className="card-body">
          <h2 className="card-title">LearnIt Sign up</h2>
          <div>
            <FormInput
              label={"Username"}
              {...register("username")}
              error={errors?.username}
            />

            <FormInput
              label={"Password"}
              {...register("password")}
              type="password"
              error={errors?.password}
            />

            <FormInput
              label={"Name"}
              {...register("name")}
              error={errors?.name}
            />

            <FormInput
              label={"Email"}
              type="email"
              {...register("email")}
              error={errors?.email}
            />
          </div>
          <div className="card-actions">
            <button
              className="btn bg-base-100 hover:btn-active hover:bg-base-200 w-full"
              type="submit"
            >
              {isLoading ? (
                <span className="loading loading-dots loading-xl"></span>
              ) : (
                "Create Account"
              )}
            </button>
            <NavLink
              to="/login"
              className="btn bg-base-100 hover:btn-active hover:bg-base-200 w-full"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
