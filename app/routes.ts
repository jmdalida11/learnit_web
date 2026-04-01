import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("note/:noteId", "routes/notes/note.tsx"),
    route("quiz", "routes/quiz/quizzes.tsx"),
    route("quiz/create", "routes/quiz/createQuiz.tsx"),
    route("quiz/:quizId", "routes/quiz/quiz.tsx"),
  ]),

  layout("routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("signup", "routes/auth/signup.tsx"),
  ]),
] satisfies RouteConfig;
