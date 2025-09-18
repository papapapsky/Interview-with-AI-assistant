import { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import "./printableArea.css";

interface IPrintableAreaProps {
  allowPasting: boolean;
  geminiAnswers: any[];
  loading: boolean;
  currentQuestion: string;
  userAnswers: string[];
  handleUserAnswer: (answers: string) => void;
}

export default function PrintableArea(props: IPrintableAreaProps) {
  const [maximize, setMaximize] = useState(false);
  const [codeMode, setCodeMode] = useState(false);

  // ref для хранения значения текста/кода
  const inputValueRef = useRef<string>("");

  useEffect(() => {
    const geminiHTMLAnswers = document.querySelectorAll(".GeminiAnswer");
    const lastAnswer = geminiHTMLAnswers[geminiHTMLAnswers.length - 1];
    if (lastAnswer) {
      lastAnswer.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.geminiAnswers]);

  useEffect(() => {
    if (props.userAnswers.length > 0) {
      const UserHTMLAnswers = document.querySelectorAll(".UserAnswer");
      UserHTMLAnswers[UserHTMLAnswers.length - 1].scrollIntoView({
        behavior: "smooth",
      });
      setTimeout(() => {
        window.scrollBy({
          top: 1000,
          behavior: "smooth",
        });
      }, 300);
    }
  }, [props.userAnswers]);

  const SendAnswer = () => {
    const userAnswer = inputValueRef.current.trim();

    if (!props.loading && props.allowPasting) {
      if (userAnswer && props.currentQuestion) {
        props.handleUserAnswer(userAnswer);
        inputValueRef.current = ""; // очищаем
      }
    }
  };

  const maximizeFiled = () => {
    setMaximize((prev) => !prev);
  };

  const toCodeMode = () => {
    setCodeMode((prev) => !prev);
  };

  return (
    <div className="InterviewMain">
      <div className="printableBackdrop" />

      <div
        className={`printableArea ${maximize ? "printableAreaFullscreen" : ""}`}
      >
        {!codeMode ? (
          <textarea
            data-testid="userInputArea"
            placeholder="Your response"
            className={`printableTextArea ${
              maximize ? "textAreaFullscren" : ""
            }`}
            defaultValue={inputValueRef.current}
            onChange={(e) => {
              inputValueRef.current = e.target.value;
              console.log(inputValueRef);
            }}
          />
        ) : (
          <CodeMirror
            className="printableCodeArea"
            value={inputValueRef.current}
            theme="dark"
            extensions={[javascript()]}
            onChange={(value) => {
              inputValueRef.current = value;
            }}
          />
        )}
        <div className="buttonsDiv">
          <button onClick={SendAnswer} className="printableAreaButton">
            ⬆
          </button>
          <button
            onClick={maximizeFiled}
            className="fullScreenBtn printableBtn"
          >
            🗖
          </button>
          <button
            onClick={toCodeMode}
            className="fullScreenBtn printableBtn toCodeBtn"
          >
            {"</>"}
          </button>
        </div>
      </div>
    </div>
  );
}
