import { geminiFetch } from "../../../../GeminiFetch";

type props = {
  setFetchLoading: (fetchLoading: boolean) => void;
  setFetchError: (fetchError: boolean) => void;
  setQuestions: (questions: object) => void;
  apiKey: string;
  userResume: string;
};

export const fetchQuestions = async ({
  setFetchError,
  setFetchLoading,
  setQuestions,
  apiKey,
  userResume,
}: props) => {
  setFetchLoading(true);
  setFetchError(false);

  try {
    if (!apiKey) {
      setFetchError(true);
      setFetchLoading(false);
      return;
    }
    const response = await geminiFetch(apiKey, userResume);
    const parsed = JSON.parse(`${response.text}`);
    console.log(setQuestions);
    setQuestions(parsed);
    localStorage.setItem("oral responses", `${response.text}`);
  } catch (err) {
    setFetchError(true);
  } finally {
    setFetchLoading(false);
  }
};
