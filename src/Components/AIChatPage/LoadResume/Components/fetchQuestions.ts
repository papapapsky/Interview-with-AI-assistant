import { geminiFetch } from "../../../../GeminiFetch";

type props = {
  setFetchLoading: (fetchLoading: boolean) => void;
  setFetchError: (fetchError: boolean) => void;
  setQuestions: (questions: object) => void;
  apiKey: string;
};

export const fetchQuestions = async ({
  setFetchError,
  setFetchLoading,
  setQuestions,
  apiKey,
}: props) => {
  const UserResume = localStorage.getItem("userResume");
  setFetchLoading(true);
  setFetchError(false);

  try {
    if (!apiKey && !UserResume) {
      setFetchError(true);
      setFetchLoading(false);
      return;
    }
    const response = await geminiFetch(apiKey, `${UserResume}`);
    console.log(response);
    console.log(UserResume);
    const parsed = JSON.parse(`${response.text}`);
    console.log(parsed);
    setQuestions(parsed);
    localStorage.setItem("oral responses", `${response.text}`);
  } catch (err) {
    setFetchError(true);
  } finally {
    setFetchLoading(false);
  }
};
