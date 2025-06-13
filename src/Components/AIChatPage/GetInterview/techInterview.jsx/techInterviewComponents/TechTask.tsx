import { useEffect, useRef, useState } from "react";
import { geminiFetch } from "../../../LoadResume/GeminiFetch";
import { techInterviewConfig } from "../../oralInterview/geminiConfigs";
import { checkAnswerPrompt, generateTasksPrompt } from "./techPrompts";
import { TechInterviewEnd } from "./techInterviewEnd";

type TypeTask = {
  taskExplanation: string[];
  exampleCode: string[];
  technologies: string;
};

interface ITechTaskProps {
  questionsQuantity: number;
  setTasksQuantity: (tasksQuantity: number) => void;
}

export const TechTask = ({
  questionsQuantity,
  setTasksQuantity,
}: ITechTaskProps) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [userResume, setUserResume] = useState<string>("");
  const [tasks, setTasks] = useState<TypeTask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userCodeResponse = useRef<HTMLTextAreaElement | null>(null);

  const storageResume = localStorage.getItem("userResume");
  const userLanguage =
    JSON.parse(localStorage.getItem("mainParameters") || "{}")?.language ||
    "English";

  useEffect(() => {
    if (storageResume) {
      setUserResume(storageResume);
    }
  }, [storageResume]);

  useEffect(() => {
    if (userResume) {
      const techTaskGenerate = async () => {
        try {
          setLoading(true);
          const TasksPrompt = generateTasksPrompt(userLanguage, userResume);
          const techTasks = await geminiFetch(
            apiKey,
            TasksPrompt,
            techInterviewConfig
          );
          const parsedTasks = JSON.parse(`${techTasks.text}`) as TypeTask[];
          setTasks(parsedTasks);
        } catch (err) {
          console.error("Ошибка при генерации задач:", err);
        } finally {
          setLoading(false);
        }
      };
      techTaskGenerate();
    }
  }, [userResume, userLanguage]);

  const nextTask = () => {
    const checkTheAnswer = async () => {
      if (!userCodeResponse.current) return;

      try {
        const CheckPrompt = checkAnswerPrompt(
          tasks[0].taskExplanation.join(" "),
          userCodeResponse.current.value
        );
        const geminiChecks = await geminiFetch(apiKey, CheckPrompt);

        const result = JSON.parse(`${geminiChecks.text}`);

        if (result.checkCorrectlyAnswer) {
          userCodeResponse.current.value =
            "//for code redactor recommended https://codepen.io/";
          setTasks((prev) => prev.slice(1));
          setTasksQuantity(5 - tasks.length);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } catch (error) {
        console.error("Ошибка при проверке ответа:", error);
      }
    };

    checkTheAnswer();
  };

  useEffect(() => {
    if (!loading) {
      const componentBox = document.querySelector(".geminiTask");
      componentBox?.classList.add("showAnimation");
    }
  }, [loading]);

  return (
    <div className="geminiTask">
      {loading && (
        <>
          <div className="loader"></div>
          <h3>Please wait, HR selects questions...</h3>
        </>
      )}
      {tasks.length > 0 && (
        <>
          <div className="taskExplanation">
            <h3>Task explanation</h3>
            <div className="explanation">
              <h5>
                Technologies: <span>{tasks[0].technologies}</span>
              </h5>
              {tasks[0].taskExplanation.map((val, index) => (
                <h4 key={index}>{val}</h4>
              ))}
            </div>
          </div>
          <div className="taskExplanation">
            <h3>Code example</h3>
            <details>
              <summary>Show code example</summary>
              <div className="codeExample">
                {tasks[0].exampleCode.map((val, index) => (
                  <h4 key={index}>{val}</h4>
                ))}
              </div>
            </details>
          </div>
          <br />
          <div className="userTextArea">
            <h3>Write your response here:</h3>
            <textarea
              ref={userCodeResponse}
              defaultValue="//for code redactor recommended https://codepen.io/"
            ></textarea>
            <button onClick={nextTask}>Next Task</button>
          </div>
        </>
      )}
      <TechInterviewEnd questionsQuantity={questionsQuantity} />
    </div>
  );
};
