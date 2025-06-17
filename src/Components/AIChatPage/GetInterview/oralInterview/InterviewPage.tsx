import HR from "../../../../../public/HR.png";
import { useEffect, useState, type ReactElement } from "react";
import PrintableArea from "../PrintableArea/PrintableArea";
import "./interviewPage.css";
import { geminiFetch } from "../../LoadResume/GeminiFetch";
import { GeminiAnswerFormat } from "./geminiAnswerFormat";
import { interviewConfig } from "./geminiConfigs";

export const InterviewPage = (): ReactElement => {
  const apiKey = import.meta.env.VITE_API_KEY;
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
      const AImessageGenerate = async () => {
        setGeminiActive(true);
        const currentQuestionKey = `question${userAnswers.length}`;
        const userAnswerKey = userAnswers.length - 1;
        if (questions[currentQuestionKey]) {
          const AImessage = await geminiFetch(
            apiKey,
            `ANSWER ON ${parsedState.language}. This is a question: ${questions[currentQuestionKey]}, This is my answer on this question: ${userAnswers[userAnswerKey]} .Please rate this answer as wrong or right, and then give a constructive addition to the answer if it is correct, and if it is wrong, tell me the correct answer. Answer without **, * and other seems like symbols.`,
            interviewConfig
          );

          const formattedResponse = JSON.parse(`${AImessage.text}`)[0];

          if (formattedResponse.answerStatus === "right") {
            setInterviewResult((event) => event + 1);
          }
          setGeminiActive(false);
          setGeminiAnswers((prev) => [...prev, formattedResponse]);
          setCurrentQuestionIndex((prev) => prev + 1);
        }
      };
      AImessageGenerate();
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
