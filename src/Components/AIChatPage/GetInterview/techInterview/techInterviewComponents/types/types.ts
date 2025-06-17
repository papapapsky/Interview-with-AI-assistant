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
  userCodeResponse: any;
  questionMistakes: number;
  setQuestionMistakes: (n: number | ((prev: number) => number)) => void;
  globalMistakes: number;
  setGlobalMistakes: (n: number | ((prev: number) => number)) => void;
}
