import HR from "../../../../../public/HR.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";

type props = {
  geminiResponse: any;
  nextQuestion: string;
  interviewResult: number;
  questions: object;
};

export const GeminiAnswerFormat = ({
  geminiResponse,
  nextQuestion,
  interviewResult,
  questions,
}: props) => {
  const [techInterview, setTechInterview] = useState<boolean>(false);
  const techInterviewCheck = localStorage.getItem("mainParameters");

  useEffect(() => {
    if (!nextQuestion && techInterviewCheck) {
      const ParsedState = JSON.parse(techInterviewCheck);
      if (ParsedState.techInterview) {
        setTechInterview(true);
      }
    }
    document.querySelectorAll("pre code").forEach((block) => {
      block.removeAttribute("data-highlighted");
    });
    hljs.highlightAll();

    console.log(geminiResponse.additionToAnswer);
  }, [geminiResponse.additionToAnswer]);

  return (
    <>
      <div className="GeminiAnswer">
        <h3 className="HRbox">
          <img src={HR} alt="" className="HRimg" />
          <b>
            Your response <span>{geminiResponse.answerStatus}</span>
          </b>
        </h3>
        {geminiResponse.explanation &&
          geminiResponse.explanation.map((value: string, index: number) => (
            <div key={index} className="explanation">
              <h4>{value}</h4>
            </div>
          ))}
        {geminiResponse.additionToAnswer.additionText &&
          geminiResponse.additionToAnswer.additionText.map(
            (value: string, index: number) => (
              <div key={index} className="additionToAnswer">
                <h4>{value}</h4>
              </div>
            )
          )}
        {geminiResponse.additionToAnswer.codeAddition.length > 0 && (
          <pre className="additionToAnswer">
            <code>
              {geminiResponse.additionToAnswer.codeAddition.join("\n")}
            </code>
          </pre>
        )}
        {nextQuestion && (
          <p>
            <span className="nextQuestion">
              The {Object.keys(geminiResponse).length - 1}/
              {Object.keys(questions).length} Question:
            </span>{" "}
            {nextQuestion}
          </p>
        )}
        <br />
      </div>
      {!nextQuestion && (
        <div className="resultBox">
          <h1>
            Oral interview completed. <br />
            Your result:{" "}
            <span>
              {interviewResult} / {Object.keys(questions).length}.
            </span>
          </h1>
          {techInterview && (
            <Link to="/AIChat/TechInterview">
              Proceed to the technical part
            </Link>
          )}
          {!techInterview && (
            <Link to="/AIChat">Return to interview settings</Link>
          )}
        </div>
      )}
    </>
  );
};
