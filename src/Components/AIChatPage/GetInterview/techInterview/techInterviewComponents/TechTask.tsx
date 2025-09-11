import "../techInterview.css";
import { useContext, useEffect, useState } from "react";
import { geminiFetch } from "../../../../../GeminiFetch";
import { techInterviewConfig } from "../../geminiConfigs";
import { generateTasksPrompt } from "./techPrompts";
import type { ITechTaskProps } from "../../../../../types/types";
import { geminiValidation } from "./geminiFetchValidation/geminiValidation";
import { TechTaskPresentational } from "./TechTaskComponents/techTaskPresentational";
import { InterviewResultContext } from "../../../../../InterviewResult";

export const TechTask = ({ ...props }: ITechTaskProps) => {
  const apiKey = localStorage.getItem("apiKey");
  if (!apiKey) {
    return <div>Please enter your API key first.</div>;
  }

  const [showAnimation, setShowAnimation] = useState<string>("");
  const ResultContext = useContext(InterviewResultContext);

  if (!ResultContext) {
    throw new Error("Result context is undefined");
  }
  const [state, setState] = ResultContext;

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
      if (!apiKey) {
        props.setError(true);
        props.setLoading(false);
        return;
      }

      const techTasks = await geminiFetch(
        apiKey,
        TasksPrompt,
        techInterviewConfig
      );
      console.log(techTasks.response);
      const parsedTasks = JSON.parse(`${techTasks.response}`);
      const validation = geminiValidation(parsedTasks.tasks);

      if (validation) {
        props.setError(false);
        props.setTasks(parsedTasks.tasks);
        console.log(parsedTasks.tasks[0]);
      } else {
        props.setError(true);
      }
    } catch (error) {
      console.log(error);
      props.setError(true);
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
    if (props.questionMistakes !== 3) {
      setState({ ...state, techCorrectAnswers: state.techCorrectAnswers + 1 });
    }

    props.setQuestionMistakes(0);
    props.setTasks(props.tasks.slice(1));
    props.setTasksQuantity(5 - props.tasks.length);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    props.loading ? setShowAnimation("") : setShowAnimation("showAnimation");
  }, [props.loading]);

  return (
    <TechTaskPresentational
      geminiThinking={props.geminiThinking}
      setGeminiThinking={props.setGeminiThinking}
      showAnimation={showAnimation}
      apiKey={apiKey}
      codeValueRef={props.userCodeResponse}
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
