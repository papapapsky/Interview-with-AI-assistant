import HR from "../../../../../../public/HR.png";
import { TextFormat } from "../textFormat/ExplanationFormat";

type props = {
  currentQuestionIndex: number;
  questions: Record<string, string>;
};

export const FirstQuestionRender = ({
  currentQuestionIndex,
  questions,
}: props) => {
  const firstQustion = questions[`question1`];

  return (
    <>
      {currentQuestionIndex < Object.keys(questions).length && (
        <div className="Phrase">
          <div className="GeminiAnswer HRbox">
            <img src={HR} alt="" className="HRimg" style={{ marginTop: 10 }} />
            <div>
              <span style={{ fontWeight: 600 }}>
                The 1/{Object.keys(questions).length} Question:{" "}
              </span>
              <TextFormat text={firstQustion} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
