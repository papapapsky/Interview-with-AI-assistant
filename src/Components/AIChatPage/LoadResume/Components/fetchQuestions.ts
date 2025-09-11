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
    console.log("as");
    const response = await geminiFetch(
      apiKey,
      `${UserResume}`,
      oralQuestionConfig(questionsQuantity)
    );
    console.log(UserResume);
    console.log(response.response);
    const parsed = JSON.parse(`${response.response}`);

    setQuestions(parsed);
    localStorage.setItem("oral responses", `${response.response}`);
  } catch (err) {
    setFetchError(true);
  } finally {
    setFetchLoading(false);
  }
};
