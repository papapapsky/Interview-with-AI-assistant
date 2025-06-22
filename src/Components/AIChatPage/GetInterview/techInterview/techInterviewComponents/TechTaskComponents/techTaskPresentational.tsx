import type { TypeTechTask } from "../../../../../../types/types";
import { InterviewEnd } from "../techInterviewEnd";
import { nextTask } from "./nextTask";

export const TechTaskPresentational = ({ ...props }: TypeTechTask) => {
  return (
    <div className="geminiTask">
      {props.error && (
        <>
          <h3>Request error, please try again</h3>
          <button onClick={() => props.techTaskGenerate()}>Try again</button>
        </>
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
                  <h4 key={index}>{val}</h4>
                )
              )}
            </div>
          </div>
          <div className="taskExplanation">
            <h3>Code example</h3>
            <details>
              <summary>Show code example</summary>
              <div className="codeExample">
                {props.tasks[0].exampleCode.map(
                  (val: string, index: number) => (
                    <h4 key={index}>{val}</h4>
                  )
                )}
              </div>
            </details>
          </div>
          <br />
          <div className="userTextArea">
            <h3>Write your response here:</h3>
            <textarea
              ref={props.userCodeResponse}
              defaultValue="//for code redactor recommended https://codepen.io/"
            ></textarea>
            {props.questionMistakes > 0 && (
              <div className="mistake">
                Wrong answer! {props.questionMistakes} / 3
              </div>
            )}
            <button
              onClick={() =>
                nextTask({
                  apiKey: props.apiKey,
                  userCodeResponse: props.userCodeResponse,
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
      <InterviewEnd questionsQuantity={props.questionsQuantity} />
    </div>
  );
};
