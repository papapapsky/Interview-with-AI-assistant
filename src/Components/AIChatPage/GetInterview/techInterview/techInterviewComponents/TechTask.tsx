import "../techInterview.css";
import { useEffect } from "react";
import { geminiFetch } from "../../../LoadResume/GeminiFetch";
import { techInterviewConfig } from "../../oralInterview/geminiConfigs";
import { checkAnswerPrompt, generateTasksPrompt } from "./techPrompts";
import { InterviewEnd } from "./techInterviewEnd";
import type { ITechTaskProps } from "./types/types";

export const TechTask = ({ ...props }: ITechTaskProps) => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const storageResume = localStorage.getItem("userResume");
  const userLanguage =
    JSON.parse(localStorage.getItem("mainParameters") || "{}")?.language ||
    "English";

  useEffect(() => {
    if (storageResume) {
      props.setUserResume(storageResume);
    }
  }, [storageResume]);

  useEffect(() => {
    if (props.userResume) {
      const techTaskGenerate = async () => {
        try {
          props.setLoading(true);
          const TasksPrompt = generateTasksPrompt(
            userLanguage,
            props.userResume
          );
          const techTasks = await geminiFetch(
            apiKey,
            TasksPrompt,
            techInterviewConfig
          );
          const parsedTasks = JSON.parse(`${techTasks.text}`);
          props.setTasks(parsedTasks);
        } catch (err) {
          console.error("Ошибка при генерации задач:", err);
        } finally {
          props.setLoading(false);
        }
      };
      techTaskGenerate();
    }
  }, [props.userResume, userLanguage]);

  const ifCorrectAnswer = () => {
    props.setQuestionMistakes(0);
    props.setTasks(props.tasks.slice(1));
    props.setTasksQuantity(5 - props.tasks.length);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextTask = () => {
    const checkTheAnswer = async () => {
      if (!props.userCodeResponse.current) return;

      try {
        const CheckPrompt = checkAnswerPrompt(
          props.tasks[0].taskExplanation.join(" "),
          props.userCodeResponse.current.value
        );
        const geminiChecks = await geminiFetch(apiKey, CheckPrompt);
        const result = JSON.parse(`${geminiChecks.text}`);

        if (result.checkCorrectlyAnswer) {
          props.userCodeResponse.current.value =
            "//for code redactor recommended https://codepen.io/";
          ifCorrectAnswer();
        } else {
          props.setQuestionMistakes(props.questionMistakes + 1);

          if (props.questionMistakes === 3) {
            ifCorrectAnswer();
            props.setGlobalMistakes(props.globalMistakes + 1);
          }
        }
      } catch (error) {
        console.error("Ошибка при проверке ответа:", error);
      }
    };

    checkTheAnswer();
  };

  useEffect(() => {
    if (!props.loading) {
      const componentBox = document.querySelector(".geminiTask");
      componentBox?.classList.add("showAnimation");
    }
  }, [props.loading]);

  return (
    <div className="geminiTask">
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
            <button onClick={nextTask}>Next Task</button>
          </div>
        </>
      )}
      <InterviewEnd questionsQuantity={props.questionsQuantity} />
    </div>
  );
};
