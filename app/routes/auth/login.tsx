import { NavLink } from "react-router";

export default function Login() {
  return (
    <div className="mt">
      <h1>Login Page</h1>
      <NavLink to="/register">Register</NavLink>
    </div>
  );
}
