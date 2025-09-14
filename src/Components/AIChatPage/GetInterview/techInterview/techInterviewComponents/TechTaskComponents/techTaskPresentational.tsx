import "../../techInterview.css";
import { useContext, useEffect, useRef, useState } from "react";
import type { TypeTechTask } from "../../../../../../types/types";
import { InterviewEnd } from "../techInterviewEnd";
import { nextTask } from "./nextTask";
import { InterviewResultContext } from "../../../../../../InterviewResult";

import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { TextFormat } from "../../../oralInterview/textFormat/ExplanationFormat";

export const TechTaskPresentational = ({ ...props }: TypeTechTask) => {
  const [codeExampleAnimation, setCodeExampleAnimation] =
    useState<boolean>(false);
  const ResultContext = useContext(InterviewResultContext);
  if (!ResultContext) {
    throw new Error("Result context is undefined");
  }
  const [state] = ResultContext;

  const codeValueRef = useRef(
    "//This redactor recommended for javascript,\n//if you write on another language we recommended https://codepen.io/"
  );

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      block.removeAttribute("data-highlighted");
    });
    hljs.highlightAll();
  }, [props.tasks]);

  const setAnimation = () => {
    setCodeExampleAnimation((event) => !event);
  };

  return (
    <div className={`geminiTask ${props.showAnimation}`}>
      {props.error && (
        <div className="errorBox">
          <h3 className="mistake">Request error, please try again</h3>
          <h4 className="errorExplanation">
            this is normal, perhaps the answer from the neural network is not
            what we need.
          </h4>
          <button onClick={() => props.techTaskGenerate()}>Try again</button>
        </div>
      )}
      {props.loading && (
        <>
          <div className="loader"></div>
          <h3>Please wait, HR selects questions...</h3>
        </>
      )}
      {props.tasks.length > 0 && (
        <>
          <div className="taskExplanation">
            <h3>Task explanation</h3>
            <div className="explanation">
              <h5>
                Technologies: <span>{props.tasks[0].technologies}</span>
              </h5>
              {props.tasks[0].taskExplanation.map(
                (val: string, index: number) => (
                  <TextFormat text={val} key={index} />
                )
              )}
            </div>
          </div>
          <div className="codeExampleBox">
            <h3>Code example</h3>
            <details>
              <summary onClick={setAnimation}>Show code example</summary>
              <div
                className={`codeExample ${
                  codeExampleAnimation ? "codeExampleAnimation" : ""
                }`}
              >
                <pre>
                  <code className="language-javascript">
                    {props.tasks[0].exampleCode.join("\n")}
                  </code>
                </pre>
              </div>
            </details>
          </div>
          <br />
          <div className="userTextArea">
            <h3>Write your response here:</h3>
            <CodeMirror
              className="codeArea"
              value={codeValueRef.current}
              height="500px"
              theme="dark"
              extensions={[javascript()]}
              onChange={(value) => {
                codeValueRef.current = value;
              }}
            />

            {props.questionMistakes > 0 && !props.geminiThinking && (
              <div className="mistake">
                Wrong answer! {props.questionMistakes} / 3
              </div>
            )}
            {props.geminiThinking && (
              <div className="loading-indicator tech">
                {" "}
                <span>Waiting for a response</span>
                <div className="dot-loader">
                  <span className="dot dot1">.</span>
                  <span className="dot dot2">.</span>
                  <span className="dot dot3">.</span>
                </div>
              </div>
            )}
            <button
              onClick={() =>
                nextTask({
                  setGeminiThinking: props.setGeminiThinking,
                  apiKey: props.apiKey,
                  codeValueRef: codeValueRef,
                  tasks: props.tasks,
                  questionMistakes: props.questionMistakes,
                  globalMistakes: props.globalMistakes,
                  ifCorrectAnswer: props.ifCorrectAnswer,
                  setGlobalMistakes: props.setGlobalMistakes,
                  setQuestionMistakes: props.setQuestionMistakes,
                })
              }
            >
              Next Task
            </button>
          </div>
        </>
      )}
      <InterviewEnd
        techQuestionsQuantity={props.questionsQuantity}
        oralCorrectAnswers={state.oralCorrectAnswers}
        techCorrectAnswers={state.techCorrectAnswers}
      />
    </div>
  );
};
