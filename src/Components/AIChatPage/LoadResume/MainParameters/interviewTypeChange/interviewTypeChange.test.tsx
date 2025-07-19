import { render, screen, fireEvent } from "@testing-library/react";
import { InterviewTypeChange } from "./InterviewTypeChange";
import { mainContext } from "../../../../../MainContext";
import { useState } from "react";
import type { TypeMainParameters } from "../../../../../MainContext";
import { vi } from "vitest";

const initialState: TypeMainParameters = {
  language: "Russian",
  techInterview: true,
  questionsQuantity: 10,
  loadedUserResume: "userResumeTest",
  interviewType: "fullInterview",
};

describe("InterviewTypeChangeTest", () => {
  const ComponentRender = () => {
    const State = useState<TypeMainParameters>(initialState);
    const [, setFullInterviewPage] = useState(false);
    const [, setThematicInterviewPage] = useState(false);

    return (
      <mainContext.Provider value={State}>
        <InterviewTypeChange
          setFullInterviewPage={setFullInterviewPage}
          setThematicInterviewPage={setThematicInterviewPage}
          fullInterview={false}
          thematicInterview={false}
        />
      </mainContext.Provider>
    );
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders correctly", () => {
    render(<ComponentRender />);
    expect(screen.getByTestId("component")).toBeInTheDocument();
  });

  test("changes interviewType to 'thematicInterview' on button click", () => {
    const setStateMock = vi.fn();
    render(
      <mainContext.Provider value={[initialState, setStateMock]}>
        <InterviewTypeChange
          setFullInterviewPage={vi.fn()}
          setThematicInterviewPage={vi.fn()}
          fullInterview={false}
          thematicInterview={false}
        />
      </mainContext.Provider>
    );
    screen.debug();

    const thematicBtn = screen.getByTestId("thematicInterviewBtn");
    fireEvent.click(thematicBtn);
    expect(setStateMock).toHaveBeenCalledWith({
      ...initialState,
      interviewType: "thematicInterview",
    });
  });

  test("classListChangeTest", () => {
    render(<ComponentRender />);
    const thematicBtn = screen.getByTestId("thematicInterviewBtn");
    const fullInterviewBtn = screen.getByTestId("fullInterviewBtn");

    expect(thematicBtn).not.toHaveClass("changedBtn");
    expect(fullInterviewBtn).toHaveClass("changedBtn");

    fireEvent.click(thematicBtn);

    expect(fullInterviewBtn).not.toHaveClass("changedBtn");
    expect(thematicBtn).toHaveClass("changedBtn");
  });
});
