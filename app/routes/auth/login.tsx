import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router";
import { loginRequest } from "~/api/auth";
import FormInput from "~/components/input/formInput";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await loginRequest(data);
      setToastMessage(null);
      navigate("/");
    } catch (error: any) {
      setToastMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card-lg w-96 bg-base-200 shadow-lg">
        {toastMessage && (
          <div className={`w-full flex justify-center bg-red-500`}>
            {toastMessage}
          </div>
        )}
        <div className="card-body">
          <h2 className="card-title">LearnIt Login</h2>
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
          <div className="card-actions">
            <button
              className="btn bg-base-100 hover:btn-active hover:bg-base-200 w-full"
              type="submit"
            >
              {isLoading ? (
                <span className="loading loading-dots loading-xl"></span>
              ) : (
                "Login"
              )}
            </button>
            <NavLink
              to="/signup"
              className="btn bg-base-100 hover:btn-active hover:bg-base-200 w-full "
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
}
