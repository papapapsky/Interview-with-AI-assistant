import { interviewConfig } from "../../geminiConfigs";
import { geminiFetch } from "../../../../../GeminiFetch";
import type React from "react";
import { aiMessageGeneratePrompts } from "../../../../GeminiPrompts/geminiPrompts";

type TypeAIMessage = {
  setAllowPasting: (allowPasting: boolean) => void;
  state: {
    oralCorrectAnswers: number;
    techCorrectAnswers: number;
  };
  setState: any;
  setError: (error: boolean) => void;
  setGeminiActive: (geminiActive: boolean) => void;
  userAnswers: string[];
  questions: { [key: string]: string };
  parsedState: { language: string };
  setInterviewResult: React.Dispatch<React.SetStateAction<number>>;
  setGeminiAnswers: React.Dispatch<React.SetStateAction<any[]>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const aiMessageGenerate = async ({
  setAllowPasting,
  state,
  setState,
  setError,
  setGeminiActive,
  userAnswers,
  questions,
  parsedState,
  setInterviewResult,
  setGeminiAnswers,
  setCurrentQuestionIndex,
}: TypeAIMessage) => {
  const apiKey = localStorage.getItem("apiKey");

  const currentQuestionKey = `question${userAnswers.length}`;
  const userAnswerKey = userAnswers.length - 1;
  console.log("asdasdas");

  setError(false);
  try {
    if (questions[currentQuestionKey]) {
      const GPTprompt = aiMessageGeneratePrompts({
        language: parsedState.language,
        question: questions[currentQuestionKey],
        userAnswer: userAnswers[userAnswerKey],
      });
      setGeminiActive(true);

      if (!apiKey) {
        setError(true);
        return false;
      }
      const AImessage = await geminiFetch(apiKey, GPTprompt, interviewConfig);

      const formattedResponse = JSON.parse(`${AImessage.response}`)[0];
      if (formattedResponse.answerStatus === "right") {
        setState({
          ...state,
          oralCorrectAnswers: state.oralCorrectAnswers + 1,
        });
        setInterviewResult((event) => event + 1);
      }
      setAllowPasting(true);
      setGeminiAnswers((prev) => [...prev, formattedResponse]);
      setCurrentQuestionIndex((prev) => prev + 1);
      return true;
    }
  } catch (err) {
    setError(true);
    return false;
  } finally {
    setGeminiActive(false);
  }
};
