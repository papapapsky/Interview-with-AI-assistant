import "./loadResume.css";
import { useEffect, useState } from "react";
import { geminiFetch } from "../../../GeminiFetch";
import { CollectResume } from "./CollectResume/CollectResume";
import { CustomLink } from "../../CustomLink";
import { MainParameters } from "./MainParameters/MainParameters";
import { Link } from "react-router-dom";
import { setResume } from "./Components/setResume";
import type { TypeAIChatPage } from "../../../types/types";

export const LoadResume = ({
  setUserResume,
  setIsQuestionLoaded,
  setFetchLoading,
  setFetchError,
  setQuestions,
  questions,
  fetchError,
  fetchLoading,
  userResume,
  isQuestionLoaded,
  setMainParameters,
  mainParameters,
}: TypeAIChatPage) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [showAnimation, setShowAnimation] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowAnimation("showParametersAnimation");

    if (localStorage.getItem("oral responses")) {
      setIsQuestionLoaded(true);
    }
  }, []);

  const fetchQuestions = async () => {
    setFetchLoading(true);
    setFetchError(false);

    try {
      const response = await geminiFetch(apiKey, userResume);
      const parsed = JSON.parse(`${response.text}`);
      setQuestions(parsed);
      localStorage.setItem("oral responses", `${response.text}`);
    } catch {
      setFetchError(true);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (!userResume) return;
    fetchQuestions();
  }, [userResume]);

  const handleFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResume(
      event,
      `${mainParameters.language}`,
      +mainParameters.questionsQuantity,
      setUserResume
    );
  };

  const renderInitial = () => (
    <div>
      <h3>
        {isQuestionLoaded && (
          <Link to="/AIChat/OralInterview" className="continueInterview">
            Continue interview
          </Link>
        )}
      </h3>
      <h1>Let`s take interview!</h1>
      <MainParameters setMainParameters={setMainParameters} />
      <form className="loadFileForm">
        <input
          type="file"
          id="resumeLoad"
          accept=".txt"
          onChange={handleFileLoad}
        />
        <label htmlFor="resumeLoad">Load resume</label>
      </form>
      <CollectResume setResumeText={setUserResume} />
    </div>
  );

  const renderLoading = () => (
    <div>
      <div className="loader"></div>
      <h2>Please wait, AI is generating questions...</h2>
    </div>
  );

  const renderError = () => (
    <div>
      <h3>Request error, please try again</h3>
      <button onClick={() => fetchQuestions()} className="ifErrorBtn">
        Try again
      </button>
    </div>
  );

  const renderReady = () => (
    <div className="StartInterviesDiv">
      <h1 style={{ color: "#8259ff" }}>Everything is ready!</h1>
      <h3>Start interview?</h3>
      <CustomLink to="/AIChat/OralInterview">Start</CustomLink>
    </div>
  );

  return (
    <div className={showAnimation}>
      {fetchLoading && renderLoading()}
      {fetchError && renderError()}
      {!fetchLoading &&
        !fetchError &&
        Object.keys(questions).length === 0 &&
        renderInitial()}
      {Object.keys(questions).length > 0 && renderReady()}
    </div>
  );
};
