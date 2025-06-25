import "./AIchatPage.css";
import { LoadResume } from "./LoadResume/LoadResume.tsx";
import { useState } from "react";

export const AIChatPage = () => {
  const [userResume, setUserResume] = useState<string>("");
  const [questions, setQuestions] = useState<object>({});
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [isQuestionLoaded, setIsQuestionLoaded] = useState<boolean>(false);
  const [mainParameters, setMainParameters] = useState<{
    [key: string]: string | number;
  }>({
    language: "",
    questionsQuantity: 5,
  });
  const [fetchError, setFetchError] = useState(false);

  return (
    <main>
      <div className="ResumeLoad">
        <LoadResume
          userResume={userResume}
          setUserResume={setUserResume}
          questions={questions}
          setQuestions={setQuestions}
          fetchLoading={fetchLoading}
          setFetchLoading={setFetchLoading}
          isQuestionLoaded={isQuestionLoaded}
          setIsQuestionLoaded={setIsQuestionLoaded}
          mainParameters={mainParameters}
          setMainParameters={setMainParameters}
          fetchError={fetchError}
          setFetchError={setFetchError}
        />
      </div>
    </main>
  );
};
