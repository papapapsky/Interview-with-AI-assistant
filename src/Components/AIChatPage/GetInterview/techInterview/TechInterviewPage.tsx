import { useState } from "react";
import "./techInterview.css";
import { TechTaskStates } from "./techInterviewComponents/TechTaskStates";
// import { InterviewEnd } from "./techInterviewComponents/techInterviewEnd";
export const TechInterviewPage = () => {
  const [tasksQuantity, setTasksQuantity] = useState<number>(1);

  return (
    <div className="techInterview">
      <h1>Technical interview</h1>
      {tasksQuantity <= 3 && <h2>Your task {tasksQuantity}/ 3</h2>}

      <TechTaskStates
        questionsQuantity={tasksQuantity}
        setTasksQuantity={setTasksQuantity}
      />
      {/* <InterviewEnd questionsQuantity={tasksQuantity} /> */}
    </div>
  );
};
