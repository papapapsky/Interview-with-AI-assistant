import HR from "../../../../../public/HR.png";
import { useEffect, useState, type ReactElement } from "react";
import PrintableArea from "../PrintableArea/PrintableArea";
import "./interviewPage.css";
import { GeminiAnswerFormat } from "./geminiAnswerFormat";
import { aiMessageGenerate } from "./AImessage/AIMessageGenerate";
import { useContext } from "react";
import { InterviewResultContext } from "../../../../InterviewResult";
import { DotLoader } from "./visualComponents/DotLoader";

export const InterviewPage = (): ReactElement => {
  const ResultContext = useContext(InterviewResultContext);
  if (!ResultContext) {
    throw new Error("context is undefined");
  }
  const [state, setState] = ResultContext;

  const [allowPasting, setAllowPasting] = useState<boolean>(true);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [geminiAnswers, setGeminiAnswers] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<{ [key: string]: string }>({});
  const [geminiActive, setGeminiActive] = useState<boolean>(false);
  const [interviewResult, setInterviewResult] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  const languageState = localStorage.getItem("mainParameters");
  if (!languageState) {
    throw new Error("Language not found in localStorage");
  }

  const parsedState = JSON.parse(languageState);
  if (!parsedState.language) {
    throw new Error("Language value is undefined in localStorage");
  }

  const AImessageParameters = {
    setAllowPasting,
    state,
    setState,
    setError,
    setGeminiActive,
    userAnswers,
    questions,
    parsedState,
    setInterviewResult,
    setGeminiAnswers,
    setCurrentQuestionIndex,
  };

  useEffect(() => {
    const GetQuestions = localStorage.getItem("oral responses");
    if (GetQuestions) {
      setQuestions(JSON.parse(GetQuestions));
    }
  }, []);

  const messageGenerate = async () => {
    if (userAnswers.length > 0) {
      const message = await aiMessageGenerate(AImessageParameters);

      if (!message) {
        setAllowPasting(false);
      }
    }
  };

  useEffect(() => {
    messageGenerate();
  }, [userAnswers, questions]);

  const handleUserAnswer = (answer: string) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, answer]);
  };

  return (
    <div className="Dialog">
      <h1>HR interview</h1>

      {currentQuestionIndex < Object.keys(questions).length && (
        <div className="Phrase">
          <div className="GeminiAnswer HRbox">
            <img src={HR} alt="" className="HRimg" style={{ marginTop: 10 }} />
            <h4 className="ShadowText">
              {questions[`question${currentQuestionIndex + 1}`]}
            </h4>
          </div>
        </div>
      )}

      {userAnswers.map((val: string, index: number) => (
        <div className="Phrase" key={index}>
          <div className="UserAnswer">{val}</div>
          {geminiAnswers[index] && (
            <GeminiAnswerFormat
              questions={questions}
              interviewResult={interviewResult}
              geminiResponse={geminiAnswers[index]}
              nextQuestion={questions[`question${index + 2}`]}
            />
          )}
        </div>
      ))}
      {geminiActive && <DotLoader />}
      {error && (
        <>
          <h3 className="mistake">Request error. Please try again</h3>
          <button onClick={messageGenerate}>Try again</button>
        </>
      )}
      {currentQuestionIndex < Object.keys(questions).length && (
        <PrintableArea
          allowPasting={allowPasting}
          geminiAnswers={geminiAnswers[geminiAnswers.length - 1]}
          loading={geminiActive}
          currentQuestion={questions[`question${currentQuestionIndex + 1}`]}
          userAnswers={userAnswers}
          handleUserAnswer={handleUserAnswer}
        />
      )}
    </div>
  );
};
