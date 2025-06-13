import { useState } from "react";
import "./techInterview.css";
import { TechTask } from "./techInterviewComponents/TechTask";

export const TechInterviewPage = () => {
  const [tasksQuantity, setTasksQuantity] = useState<number>(1);

  return (
    <div className="techInterview">
      <h1>Technical interview</h1>
      {tasksQuantity <= 3 && <h2>Your task {tasksQuantity}/ 3</h2>}
      {tasksQuantity > 3 && <h2>Interview is end!</h2>}
      <TechTask
        questionsQuantity={tasksQuantity}
        setTasksQuantity={setTasksQuantity}
      />
    </div>
  );
};
