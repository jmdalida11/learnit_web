import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router";
import { loginRequest } from "~/api/auth";
import FormInput from "~/components/inputs/formInput";
import { useNavigate } from "react-router";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="card-lg w-96 bg-base-200 shadow-lg">
        {toastMessage && (
          <div className={`w-full flex justify-center bg-red-500`}>
            {toastMessage}
          </div>
        )}
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <FormInput
            label={"Username"}
            {...register("username", {
              required: "Username is required",
            })}
            error={errors?.username}
          />
          <FormInput
            label={"Password"}
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            error={errors?.password}
          />
          <div className="card-actions">
            <button className="btn btn-active w-full" type="submit">
              {isLoading ? (
                <span className="loading loading-dots loading-xl"></span>
              ) : (
                "Login"
              )}
            </button>
            <NavLink to="/signup" className="btn btn-active w-full">
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
}
