import { useEffect, useState } from "react";
import { CustomLink } from "../../../../CustomLink";

interface IProps {
  oralCorrectAnswers: number;
  techCorrectAnswers: number;
  techQuestionsQuantity: number;
}

export const InterviewEnd = ({
  techQuestionsQuantity,
  techCorrectAnswers,
  oralCorrectAnswers,
}: IProps) => {
  const [questionsQuantity, setQuestionsQuantity] = useState<number>(0);

  const oralQuestions = localStorage.getItem("oral responses");
  useEffect(() => {
    if (oralQuestions) {
      setQuestionsQuantity(JSON.parse(oralQuestions).length);
    }
  }, []);

  return (
    <>
      {techQuestionsQuantity > 3 && (
        <div className="interviewEnd">
          <h2>Congratulations! Interview is end</h2>
          <h2>
            <span>Your oral correct answers:</span> {oralCorrectAnswers} /{" "}
            <span>{questionsQuantity}</span>
          </h2>
          <h2>
            <span>Your technical correct answers:</span> {techCorrectAnswers} /{" "}
            <span>{techQuestionsQuantity}</span>
          </h2>
          <CustomLink to="/" className="CustomLinkBtn">
            Go to homepage
          </CustomLink>
        </div>
      )}
    </>
  );
};
