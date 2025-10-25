import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router";
import FormInput from "~/components/inputs/formInput";

type Inputs = {
  username: string;
  password: string;
  name: string;
  email: string;
};

const Register = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="card-lg w-96 bg-base-100 shadow-lg p-5!">
        <h2 className="card-title mb-2!">Sign up</h2>
        <div className="card-body">
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
          <div className="justify-end card-actions">
            <NavLink to="/login" className="btn btn-active px-3!">
              Back to login
            </NavLink>
            <button className="btn btn-active px-3!" type="submit">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
