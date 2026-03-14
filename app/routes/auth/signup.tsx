import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router";
import { signUpRequest } from "~/api/auth";
import FormInput from "~/components/inputs/formInput";
import { cn } from "~/utils/cn";

type Inputs = {
  username: string;
  password: string;
  name: string;
  email: string;
};

const Signup = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastStatus, setToastStatus] = useState<"success" | "error">(
    "success",
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
              {...register("username", {
                required: "Username is required",
                minLength: { value: 3, message: "Minimum length is 3" },
                maxLength: { value: 30, message: "Maximum length is 30" },
              })}
              error={errors?.username}
            />

            <FormInput
              label={"Password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum length is 8" },
                maxLength: { value: 30, message: "Maximum length is 30" },
              })}
              type="password"
              error={errors?.password}
            />

            <FormInput
              label={"Name"}
              {...register("name", {
                required: "Name is required",
                maxLength: { value: 255, message: "Maximum length is 255" },
              })}
              error={errors?.name}
            />

            <FormInput
              label={"Email"}
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              error={errors?.email}
            />
          </div>
          <div className="card-actions">
            <button className="btn hover:btn-active w-full" type="submit">
              {isLoading ? (
                <span className="loading loading-dots loading-xl"></span>
              ) : (
                "Create Account"
              )}
            </button>
            <NavLink to="/login" className="btn hover:btn-active w-full">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
