import type { TypeNextTaskProps } from "../../../../../../types/types";
import { checkAnswerPrompt } from "../techPrompts";
import { geminiFetch } from "../../../../../../GeminiFetch";

export const nextTask = ({
  apiKey,
  userCodeResponse,
  tasks,
  questionMistakes,
  globalMistakes,
  ifCorrectAnswer,
  setGlobalMistakes,
  setQuestionMistakes,
}: TypeNextTaskProps) => {
  const checkTheAnswer = async () => {
    if (!userCodeResponse.current) return;

    try {
      const CheckPrompt = checkAnswerPrompt(
        tasks[0].taskExplanation.join(" "),
        userCodeResponse.current.value
      );
      const geminiChecks = await geminiFetch(apiKey, CheckPrompt);
      const result = JSON.parse(`${geminiChecks.text}`);

      if (result.checkCorrectlyAnswer) {
        userCodeResponse.current.value =
          "//for code redactor recommended https://codepen.io/";
        ifCorrectAnswer();
      } else {
        setQuestionMistakes(questionMistakes + 1);

        if (questionMistakes === 3) {
          ifCorrectAnswer();
          setGlobalMistakes(globalMistakes + 1);
        }
      }
    } catch (error) {
      console.error("Ошибка при проверке ответа:", error);
    }
  };

  checkTheAnswer();
};
