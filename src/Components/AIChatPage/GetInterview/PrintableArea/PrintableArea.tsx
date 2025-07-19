import { useEffect, useRef, useState } from "react";
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
  const [maximize, setMaximize] = useState<boolean>(false);
  const InputRef = useRef<HTMLTextAreaElement>(null);

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
    const userAnswer = InputRef.current?.value.trim();

    if (!props.loading && props.allowPasting) {
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
      <div className="printableBackdrop" />

      <div
        className={`printableArea ${maximize ? "printableAreaFullscreen" : ""}`}
      >
        <textarea
          data-testid="userInputArea"
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
