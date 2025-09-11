import type { TypeNextTaskProps } from "../../../../../../types/types";
import { checkAnswerPrompt } from "../techPrompts";
import { geminiFetch } from "../../../../../../GeminiFetch";

export const nextTask = ({
  setGeminiThinking,
  apiKey,
  codeValueRef,
  tasks,
  questionMistakes,
  globalMistakes,
  ifCorrectAnswer,
  setGlobalMistakes,
  setQuestionMistakes,
}: TypeNextTaskProps) => {
  const checkTheAnswer = async () => {
    if (!codeValueRef.current) return;
    try {
      setGeminiThinking(true);
      const CheckPrompt = checkAnswerPrompt(
        tasks[0].taskExplanation.join(" "),
        codeValueRef.current
      );
      const geminiChecks = await geminiFetch(apiKey, CheckPrompt);
      console.log(geminiChecks);
      const result = JSON.parse(`${geminiChecks.response}`);

      if (result.checkCorrectlyAnswer) {
        codeValueRef.current = "";
        ifCorrectAnswer();
      } else {
        setQuestionMistakes(questionMistakes + 1);

        if (questionMistakes === 3) {
          ifCorrectAnswer();
          setGlobalMistakes(globalMistakes + 1);
        }
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setGeminiThinking(false);
    }
  };

  checkTheAnswer();
};
