import { interviewConfig } from "../../geminiConfigs";
import { geminiFetch } from "../../../../../GeminiFetch";
import type React from "react";
import { aiMessageGeneratePrompts } from "../../../../GeminiPrompts/geminiPrompts";

type TypeAIMessage = {
  setGeminiActive: (geminiActive: boolean) => void;
  userAnswers: string[];
  questions: { [key: string]: string };
  parsedState: { language: string };
  setInterviewResult: React.Dispatch<React.SetStateAction<number>>;
  setGeminiAnswers: React.Dispatch<React.SetStateAction<any[]>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const aiMessageGenerate = async ({
  setGeminiActive,
  userAnswers,
  questions,
  parsedState,
  setInterviewResult,
  setGeminiAnswers,
  setCurrentQuestionIndex,
}: TypeAIMessage) => {
  setGeminiActive(true);
  const apiKey = import.meta.env.VITE_API_KEY;
  const currentQuestionKey = `question${userAnswers.length}`;
  const userAnswerKey = userAnswers.length - 1;
  if (questions[currentQuestionKey]) {
    const GPTprompt = aiMessageGeneratePrompts({
      language: parsedState.language,
      question: questions[currentQuestionKey],
      userAnswer: userAnswers[userAnswerKey],
    });
    const AImessage = await geminiFetch(apiKey, GPTprompt, interviewConfig);

    const formattedResponse = JSON.parse(`${AImessage.text}`)[0];

    if (formattedResponse.answerStatus === "right") {
      setInterviewResult((event) => event + 1);
    }
    setGeminiActive(false);
    setGeminiAnswers((prev) => [...prev, formattedResponse]);
    setCurrentQuestionIndex((prev) => prev + 1);
  }
};
