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
  const [maximize, setMaximize] = useState<boolean>(true);
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
    const printableArea = document.querySelector(".printableArea");
    const textArea = InputRef.current;

    if (!!maximize) {
      printableArea?.classList.add("printableAreaFullscreen");
      textArea?.classList.add("textAreaFullscreen");
      setMaximize(false);
    } else {
      printableArea?.classList.remove("printableAreaFullscreen");
      textArea?.classList.remove("textAreaFullscreen");
      setMaximize(true);
    }
  };

  return (
    <div className="InterviewMain">
      <div className="printableArea">
        <textarea
          placeholder="Your response"
          className="printableTextArea"
          ref={InputRef}
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
