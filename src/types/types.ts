import type { RefObject } from "react";

export interface TypeTask {
  taskExplanation: string[];
  exampleCode: string[];
  technologies: string;
}

export interface ITechTaskProps {
  questionsQuantity: number;
  setTasksQuantity: (tasksQuantity: number) => void;
  userResume: string;
  setUserResume: (resume: string) => void;
  tasks: TypeTask[];
  setTasks: (tasks: TypeTask[] | ((prev: TypeTask[]) => TypeTask[])) => void;
  error: boolean;
  setError: (error: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  userCodeResponse: RefObject<HTMLTextAreaElement>;
  questionMistakes: number;
  setQuestionMistakes: (n: number | ((prev: number) => number)) => void;
  globalMistakes: number;
  setGlobalMistakes: (n: number | ((prev: number) => number)) => void;
}

export type TypeAIChatPage = {
  userResume: string;
  setUserResume: (userResume: string) => void;
  questions: object;
  setQuestions: (questions: object) => void;
  fetchLoading: boolean;
  setFetchLoading: (fetchLoading: boolean) => void;
  isQuestionLoaded: boolean;
  setIsQuestionLoaded: (isQuestionLoading: boolean) => void;
  mainParameters: { [key: string]: string | number };
  setMainParameters: (mainParameters: {
    [key: string]: string | number;
  }) => void;
  fetchError: boolean;
  setFetchError: (fetchError: boolean) => void;
};

export type TypeNextTaskProps = {
  apiKey: string;
  userCodeResponse: RefObject<HTMLTextAreaElement>;
  tasks: TypeTask[];
  questionMistakes: number;
  globalMistakes: number;
  ifCorrectAnswer: () => void;
  setQuestionMistakes: (questionMistakes: number) => void;
  setGlobalMistakes: (globalMistakes: number) => void;
};

export type TypeTechTask = TypeNextTaskProps & {
  showAnimation: string;
  questionsQuantity: number;
  loading: boolean;
  error: boolean;
  techTaskGenerate: () => void;
};
