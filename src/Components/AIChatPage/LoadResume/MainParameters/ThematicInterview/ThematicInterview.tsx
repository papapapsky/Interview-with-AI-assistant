import { geminiFetch } from "../../../../../GeminiFetch";
import { useContext, useRef } from "react";
import "./thematicInterview.css";
import { mainContext } from "../../../../../MainContext";
import { thematicPrompt } from "./thematicPrompt";
import { oralQuestionConfig } from "../../../GetInterview/geminiConfigs";

type parsedGeminiFetchType = {
  response: string;
};

type props = {
  setFetchError: (fetchError: boolean) => void;
  setFetchLoading: (fetchLoading: boolean) => void;
  setQuestions: (questions: object) => void;
};

export const ThematicInterview = ({
  setFetchError,
  setFetchLoading,
  setQuestions,
}: props) => {
  const topicRef = useRef<HTMLInputElement>(null);
  const apiKey = localStorage.getItem("apiKey");
  const context = useContext(mainContext);
  if (!apiKey || !context) {
    throw new Error("context or apiKey is undefined");
  }
  const [state] = context;

  const geminiThematicFetch = async () => {
    setFetchLoading(true);
    setFetchError(false);
    try {
      if (!topicRef.current) return false;
      const thematicPromptText = thematicPrompt({
        topic: topicRef.current.value,
        questionsQuantity: state.questionsQuantity,
        language: state.language,
      });
      localStorage.setItem("userResume", thematicPromptText);

      const geminiResponse: parsedGeminiFetchType = await geminiFetch(
        apiKey,
        thematicPromptText,
        oralQuestionConfig
      );

      const parsed = JSON.parse(`${geminiResponse.response}`);
      setQuestions(parsed);

      localStorage.setItem("oral responses", `${geminiResponse.response}`);
    } catch (err) {
      console.error(err);
      setFetchError(true);
    } finally {
      setFetchLoading(false);
    }
  };

  const startInterview = () => {
    if (topicRef.current?.value !== "") {
      geminiThematicFetch();
    }
  };

  return (
    <div className="thematicInterviewPage">
      <h3>Write a topic</h3>
      <input
        className="writeTopic"
        name="topic"
        data-testid="input"
        ref={topicRef}
        placeholder="// React routes, React hooks, axios etc."
      />
      <button className="startBtn" onClick={startInterview}>
        Start
      </button>
    </div>
  );
};
