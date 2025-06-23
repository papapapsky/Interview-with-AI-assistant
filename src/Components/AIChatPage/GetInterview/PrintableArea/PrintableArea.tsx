import { useEffect, useRef, useState } from "react";
import "./printableArea.css";

interface IPrintableAreaProps {
  geminiAnswers: any[];
  loading: boolean;
  currentQuestion: string;
  userAnswers: string[];
  handleUserAnswer: (answers: string) => void;
}

export default function PrintableArea(props: IPrintableAreaProps) {
  const [maximize, setMaximize] = useState<boolean>(false);
  const InputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const geminiHTMLAnswers = document.querySelectorAll(".GeminiAnswer");
    geminiHTMLAnswers[geminiHTMLAnswers.length - 1].scrollIntoView({
      behavior: "smooth",
    });
  }, [props.geminiAnswers]);

  useEffect(() => {
    if (props.userAnswers.length > 0) {
      const UserHTMLAnswers = document.querySelectorAll(".UserAnswer");
      UserHTMLAnswers[UserHTMLAnswers.length - 1].scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [props.userAnswers]);

  const SendAnswer = () => {
    const userAnswer = InputRef.current?.value.trim();

    if (!props.loading) {
      if (userAnswer && props.currentQuestion) {
        props.handleUserAnswer(userAnswer);
        if (InputRef.current) {
          InputRef.current.value = "";
        }
      }
    }
  };
  const maximizeFiled = () => {
    setMaximize((prev) => !prev);
  };

  return (
    <div className="InterviewMain">
      <div
        className={`printableArea ${maximize ? "printableAreaFullscreen" : ""}`}
      >
        <textarea
          ref={InputRef}
          placeholder="Your response"
          className={`printableTextArea ${maximize ? "textAreaFullscren" : ""}`}
        />
        <div className="buttonsDiv">
          <button onClick={SendAnswer} className="printableAreaButton">
            ⬆
          </button>
          <button
            onClick={() => maximizeFiled()}
            className="fullScreenBtn printableBtn"
          >
            🗖
          </button>
        </div>
      </div>
    </div>
  );
}
