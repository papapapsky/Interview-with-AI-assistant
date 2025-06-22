import { useState, useRef } from "react";
import { TechTask } from "./TechTask";
import type { TypeTask } from "../../../../../types/types";

interface tasksProps {
  questionsQuantity: number;
  setTasksQuantity: (tasksQuantity: number) => void;
}

export const TechTaskStates = ({
  questionsQuantity,
  setTasksQuantity,
}: tasksProps) => {
  const [userResume, setUserResume] = useState<string>("");
  const [tasks, setTasks] = useState<TypeTask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userCodeResponse = useRef<any>(null);
  const [questionMistakes, setQuestionMistakes] = useState<number>(0);
  const [globalMistakes, setGlobalMistakes] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  return (
    <TechTask
      questionsQuantity={questionsQuantity}
      setTasksQuantity={setTasksQuantity}
      userResume={userResume}
      setUserResume={setUserResume}
      tasks={tasks}
      setTasks={setTasks}
      error={error}
      setError={setError}
      loading={loading}
      setLoading={setLoading}
      userCodeResponse={userCodeResponse}
      questionMistakes={questionMistakes}
      setQuestionMistakes={setQuestionMistakes}
      globalMistakes={globalMistakes}
      setGlobalMistakes={setGlobalMistakes}
    />
  );
};
