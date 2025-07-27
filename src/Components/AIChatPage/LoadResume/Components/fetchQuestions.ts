import { geminiFetch } from "../../../../GeminiFetch";
import { oralQuestionConfig } from "../../GetInterview/geminiConfigs";

type props = {
  setFetchLoading: (fetchLoading: boolean) => void;
  setFetchError: (fetchError: boolean) => void;
  setQuestions: (questions: object) => void;
  apiKey: string | null;
};

export const fetchQuestions = async ({
  setFetchError,
  setFetchLoading,
  setQuestions,
  apiKey,
}: props) => {
  const UserResume = localStorage.getItem("userResume");
  const mainParameters = localStorage.getItem("mainParameters");
  setFetchLoading(true);
  setFetchError(false);
  const questionsQuantity = JSON.parse(`${mainParameters}`).questionsQuantity;

  try {
    if (!apiKey || !UserResume || !mainParameters) {
      setFetchError(true);
      return;
    }
    const response = await geminiFetch(
      apiKey,
      `${UserResume}`,
      oralQuestionConfig(questionsQuantity)
    );
    console.log(UserResume);
    console.log(response.text);
    const parsed = JSON.parse(`${response.text}`);

    setQuestions(parsed);
    localStorage.setItem("oral responses", `${response.text}`);
  } catch (err) {
    setFetchError(true);
  } finally {
    setFetchLoading(false);
  }
};
