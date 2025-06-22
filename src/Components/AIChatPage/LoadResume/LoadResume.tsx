import "./loadResume.css";

import { useEffect } from "react";
import { geminiFetch } from "../../../GeminiFetch";
import { CollectResume } from "./CollectResume/CollectResume";
import { CustomLink } from "../../CustomLink";
import { MainParameters } from "./MainParameters/MainParameters";
import { Link } from "react-router-dom";
import type { TypeAIChatPage } from "../../../types/types";
import { setResume } from "./Components/setResume";

export const LoadResume = ({ ...props }: TypeAIChatPage) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const contentBox = document.getElementById("loadResume");
    contentBox?.classList.add("showParametersAnimation");

    if (localStorage.getItem("oral responses")) {
      props.setIsQuestionLoaded(true);
    }
  }, []);

  const handleResumeText = (text: string) => {
    props.setUserResume(text);
  };

  const showGPTresponse = async () => {
    if (!props.userResume) return;
    props.setFetchLoading(true);
    props.setFetchError(false);

    try {
      const response = await geminiFetch(apiKey, props.userResume);
      const parseQuestions = `${response.text}`;
      props.setQuestions(JSON.parse(parseQuestions));
      localStorage.setItem("oral responses", parseQuestions);
    } catch (error) {
      props.setFetchError(true);
    } finally {
      props.setFetchLoading(false);
    }
  };

  useEffect(() => {
    showGPTresponse();
  }, [props.userResume]);

  return (
    <div id="loadResume">
      {!props.fetchLoading &&
        !props.fetchError &&
        Object.keys(props.questions).length === 0 && (
          <div>
            <h3>
              {props.isQuestionLoaded && (
                <Link to="/AIChat/OralInterview" className="continueInterview">
                  Continue interview
                </Link>
              )}
            </h3>
            <h1>Let`s take interview!</h1>
            <MainParameters setMainParameters={props.setMainParameters} />
            <h2 style={{ margin: 0, marginTop: 50 }}>
              Before, load your resume here(.txt, .pdf)
            </h2>
            <form className="loadFileForm">
              <input
                type="file"
                id="resumeLoad"
                accept=".txt"
                onChange={(event) =>
                  setResume(
                    event,
                    `${props.mainParameters.language}`,
                    +props.mainParameters.questionsQuantity,
                    props.setUserResume
                  )
                }
              />
              <label htmlFor="resumeLoad">Load file</label>
            </form>
            <CollectResume setResumeText={handleResumeText} />
          </div>
        )}
      {props.fetchLoading && (
        <div>
          <div className="loader"></div>
          <h2>Please wait, AI generating questions...</h2>
        </div>
      )}
      {props.fetchError && (
        <div>
          <h3>Request error, please try again</h3>
          <button onClick={() => showGPTresponse()} className="ifErrorBtn">
            Try again
          </button>
        </div>
      )}
      {Object.keys(props.questions).length > 0 && (
        <div className="StartInterviesDiv">
          <h1 style={{ color: "#8259ff" }}>Everything is ready!</h1>
          <h3>Start interview?</h3>
          <CustomLink to="/AIChat/OralInterview">Start</CustomLink>
        </div>
      )}
    </div>
  );
};
