import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("about", "routes/about/about.tsx"),

  layout("routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
  ]),
] satisfies RouteConfig;
