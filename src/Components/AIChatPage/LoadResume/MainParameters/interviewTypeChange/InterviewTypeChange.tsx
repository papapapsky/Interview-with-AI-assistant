import { useContext } from "react";
import "./interviewTypeChange.css";
import { mainContext } from "../../../../../MainContext";

type props = {
  setFullInterviewPage: (fullInterview: boolean) => void;
  setThematicInterviewPage: (thematicInterviewPage: boolean) => void;
  fullInterview: boolean;
  thematicInterview: boolean;
};

export const InterviewTypeChange = ({
  setFullInterviewPage,
  setThematicInterviewPage,
}: props) => {
  const context = useContext(mainContext);
  if (!context) {
    throw new Error("error, context is undefined");
  }
  const [state, setState] = context;

  const changePage = (event: any) => {
    if (event.target.id === "fullInterviewBtn") {
      setState({ ...state, interviewType: "fullInterview" });
      setFullInterviewPage(true);
      setThematicInterviewPage(false);
    } else if (event.target.id === "thematicInterviewBtn") {
      setState({ ...state, interviewType: "thematicInterview" });
      setFullInterviewPage(false);
      setThematicInterviewPage(true);
    }
  };

  return (
    <div className="typeChangeBox">
      <div>
        <button
          id="fullInterviewBtn"
          className={`fullInterviewBtn ${
            state.interviewType === "fullInterview" ? "changedBtn" : ""
          }`}
          onClick={(event) => changePage(event)}
        >
          Full interview
        </button>
        <button
          onClick={(event) => changePage(event)}
          className={`thematicInterview ${
            state.interviewType === "thematicInterview" ? "changedBtn" : ""
          }`}
          id="thematicInterviewBtn"
        >
          Thematic interview
        </button>
      </div>
    </div>
  );
};
