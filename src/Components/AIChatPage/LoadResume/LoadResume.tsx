import "./loadResume.css";

import React, { useEffect, useState } from "react";
import { geminiFetch } from "./GeminiFetch";
import { CollectResume } from "./CollectResume/CollectResume";
import { CustomLink } from "../../CustomLink";
import { MainParameters } from "./MainParameters/MainParameters";
import { Link } from "react-router-dom";

export const LoadResume = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [userResume, setUserResume] = useState<string>("");
  const [questions, setQuestions] = useState<object>({});
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [isQuestionLoaded, setIsQuestionLoaded] = useState<boolean>(false);
  const [mainParameters, setMainParameters] = useState<{
    [key: string]: string | number;
  }>({
    language: "English",
    questionsQuantity: 10,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const contentBox = document.getElementById("loadResume");
    contentBox?.classList.add("showParametersAnimation");

    if (localStorage.getItem("oral responses")) {
      setIsQuestionLoaded(true);
    }
  }, []);

  const setResume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text: string = e.target?.result as string;
        let sampleText = `RESPONSE ON ${mainParameters.language}. Please make me ${mainParameters.questionsQuantity} questions that are asked at an interview for a programmer position in this form. WRITE ONLY QUESTIONS Something like this: 
        {"qustion1":"question","qustion2":"question"}. 
        WITHOUT TRIPLE QUOTES
        Write only a questions.`;
        setUserResume(`${text}.${sampleText}`);
        localStorage.setItem("userResume", `${text}`);
      };
      reader.readAsText(file);
    }
  };
  const handleResumeText = (text: string) => {
    setUserResume(text);
  };

  useEffect(() => {
    const showGPTresponse = async () => {
      if (!userResume) return;
      setFetchLoading(true);

      try {
        const response = await geminiFetch(apiKey, userResume);
        const parseQuestions = `${response.text}`;
        setQuestions(JSON.parse(parseQuestions));
        localStorage.setItem("oral responses", parseQuestions);
      } catch (error) {
        console.error(error);
      } finally {
        setFetchLoading(false);
      }
    };

    showGPTresponse();
  }, [userResume]);

  return (
    <div id="loadResume">
      {!fetchLoading && Object.keys(questions).length === 0 && (
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
          <h2 style={{ margin: 0, marginTop: 50 }}>
            Before, load your resume here(.txt, .pdf)
          </h2>
          <form className="loadFileForm">
            <input
              type="file"
              id="resumeLoad"
              accept=".txt"
              onChange={(event) => setResume(event)}
            />
            <label htmlFor="resumeLoad">Load file</label>
          </form>
          <CollectResume setResumeText={handleResumeText} />
        </div>
      )}
      {fetchLoading && (
        <div>
          <div className="loader"></div>
          <h2>Please wait, AI generating questions...</h2>
        </div>
      )}
      {Object.keys(questions).length > 0 && (
        <div className="StartInterviesDiv">
          <h1 style={{ color: "#8259ff" }}>Everything is ready!</h1>
          <h3>Start interview?</h3>
          <CustomLink to="/AIChat/OralInterview">Start</CustomLink>
        </div>
      )}
    </div>
  );
};
