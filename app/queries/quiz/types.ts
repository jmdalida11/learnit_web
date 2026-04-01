import type { Note } from "../notes/types";

export enum QuizQueryKey {
  Quiz = "Quiz",
  Quizzes = "Quizzes",
}

export interface Category {
  id: string;
  name: string;
}

export interface Question {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  type: "multiple_choice" | "multiple_answer" | "true_false" | "short_answer";
}

export interface Quiz {
  id: string;
  title: string;
  note: Note | null;
  questions: Question[];
  categories: Category[];
  attempts: number;
  averageScore: number;
  createdAt: string;
  updatedAt: string;
}
