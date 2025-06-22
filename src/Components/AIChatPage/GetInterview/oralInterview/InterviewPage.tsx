import HR from "../../../../../public/HR.png";
import { useEffect, useState, type ReactElement } from "react";
import PrintableArea from "../PrintableArea/PrintableArea";
import "./interviewPage.css";
import { GeminiAnswerFormat } from "./geminiAnswerFormat";
import { aiMessageGenerate } from "./AImessage/AIMessageGenerate";

export const InterviewPage = (): ReactElement => {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [geminiAnswers, setGeminiAnswers] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<{ [key: string]: string }>({});
  const [geminiActive, setGeminiActive] = useState<boolean>(false);
  const [interviewResult, setInterviewResult] = useState<number>(0);

  const languageState = localStorage.getItem("mainParameters");
  if (!languageState) {
    throw new Error("Language not found in localStorage");
  }

  const parsedState = JSON.parse(languageState);
  if (!parsedState.language) {
    throw new Error("Language value is undefined in localStorage");
  }

  useEffect(() => {
    const GetQuestions = localStorage.getItem("oral responses");
    if (GetQuestions) {
      setQuestions(JSON.parse(GetQuestions));
    }
  }, []);
  useEffect(() => {
    if (userAnswers.length > 0) {
      aiMessageGenerate({
        setGeminiActive,
        userAnswers,
        questions,
        parsedState,
        setInterviewResult,
        setGeminiAnswers,
        setCurrentQuestionIndex,
      });
    }
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
            <img src={HR} alt="" className="HRimg" style={{ marginTop: 10 }} />{" "}
            <h4>{questions[`question${currentQuestionIndex + 1}`]}</h4>
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
      {currentQuestionIndex < Object.keys(questions).length && (
        <PrintableArea
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
