import "../techInterview.css";
import { useEffect } from "react";
import { geminiFetch } from "../../../../../GeminiFetch";
import { techInterviewConfig } from "../../geminiConfigs";
import { generateTasksPrompt } from "./techPrompts";
import type { ITechTaskProps } from "../../../../../types/types";
import { geminiValidation } from "./geminiFetchValidation/geminiValidation";
import { TechTaskPresentational } from "./TechTaskComponents/techTaskPresentational";

export const TechTask = ({ ...props }: ITechTaskProps) => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const storageResume = localStorage.getItem("userResume");
  const userLanguage =
    JSON.parse(localStorage.getItem("mainParameters") || "{}")?.language ||
    "English";

  useEffect(() => {
    if (storageResume) {
      props.setUserResume(storageResume);
    }
  }, [storageResume]);

  const techTaskGenerate = async () => {
    try {
      props.setError(false);
      props.setLoading(true);
      const TasksPrompt = generateTasksPrompt(userLanguage, props.userResume);
      const techTasks = await geminiFetch(
        apiKey,
        TasksPrompt,
        techInterviewConfig
      );
      const parsedTasks = JSON.parse(`${techTasks.text}`);
      const validation = geminiValidation(parsedTasks);

      if (validation) {
        props.setTasks(parsedTasks);
      } else {
        props.setError(true);
      }
    } catch (err) {
      console.error("Ошибка при генерации задач:", err);
    } finally {
      props.setLoading(false);
    }
  };

  useEffect(() => {
    if (props.userResume) {
      techTaskGenerate();
    }
  }, [props.userResume, userLanguage]);

  const ifCorrectAnswer = () => {
    props.setQuestionMistakes(0);
    props.setTasks(props.tasks.slice(1));
    props.setTasksQuantity(5 - props.tasks.length);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!props.loading) {
      const componentBox = document.querySelector(".geminiTask");
      componentBox?.classList.add("showAnimation");
    }
  }, [props.loading]);

  return (
    <TechTaskPresentational
      apiKey={apiKey}
      userCodeResponse={props.userCodeResponse}
      tasks={props.tasks}
      questionMistakes={props.questionMistakes}
      globalMistakes={props.globalMistakes}
      ifCorrectAnswer={ifCorrectAnswer}
      setQuestionMistakes={props.setQuestionMistakes}
      setGlobalMistakes={props.setGlobalMistakes}
      questionsQuantity={props.questionsQuantity}
      loading={props.loading}
      error={props.error}
      techTaskGenerate={techTaskGenerate}
    />
  );
};
