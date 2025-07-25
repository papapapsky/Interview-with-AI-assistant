import { OralQuestionsResumePrompt } from "../../../GeminiPrompts/geminiPrompts";
import type { ChangeEvent } from "react";

export const setResume = (
  event: ChangeEvent<HTMLInputElement>,
  language: string,
  questionsQuantity: number,
  setUserResume: (userResume: string) => void
) => {
  const file = event?.target.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text: string = e.target?.result as string;
      let sampleText = OralQuestionsResumePrompt(
        `${language}`,
        questionsQuantity
      );
      setUserResume(`${text}.${sampleText}`);
      localStorage.setItem("userResume", `${text}.${sampleText}`);
    };
    reader.readAsText(file);
  }
};
