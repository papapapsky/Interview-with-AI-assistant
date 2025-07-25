import { render } from "@testing-library/react";
import { LoadResume } from "./LoadResume";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { screen } from "@testing-library/react";
import { mainContext } from "../../../MainContext";
import type { TypeMainParameters } from "../../../MainContext";
import { useState } from "react";

const initialState: TypeMainParameters = {
  language: "Russian",
  techInterview: true,
  questionsQuantity: 10,
  loadedUserResume: "userResumeTest",
  interviewType: "fullInterview",
};

describe("loadResume test", () => {
  const LoadResumeComponent = (props: any) => {
    const setUserResume = props.setUserResume;
    const setIsQuestionLoaded = props.setIsQuestionLoaded;
    const setFetchLoading = props.setFetchLoading;
    const setFetchError = props.setFetchError;
    const setQuestions = props.setQuestions;
    const questions = props.questions;
    const fetchError = props.fetchError;
    const fetchLoading = props.fetchLoading;
    const userResume = props.userResume;
    const isQuestionLoaded = props.isQuestionLoaded;
    const setMainParameters = props.setMainParameters;
    const mainParameters = {
      language: "russian",
      questionsQuantity: 2,
    };
    const State = useState<TypeMainParameters>(initialState);

    return (
      <mainContext.Provider value={State}>
        <LoadResume
          setUserResume={setUserResume}
          setIsQuestionLoaded={setIsQuestionLoaded}
          setFetchError={setFetchError}
          setFetchLoading={setFetchLoading}
          setQuestions={setQuestions}
          questions={questions}
          fetchError={fetchError}
          fetchLoading={fetchLoading}
          userResume={userResume}
          isQuestionLoaded={isQuestionLoaded}
          setMainParameters={setMainParameters}
          mainParameters={mainParameters}
        />
      </mainContext.Provider>
    );
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("if questions loaded Test", () => {
    vi.spyOn(globalThis.localStorage.__proto__, "getItem").mockReturnValue(
      "api-key"
    );

    const props = {
      setUserResume: vi.fn(),
      setIsQuestionLoaded: vi.fn(),
      setFetchLoading: vi.fn(),
      setFetchError: vi.fn(),
      setQuestions: vi.fn(),
      questions: vi.fn(),
      fetchError: false,
      fetchLoading: false,
      userResume: vi.fn(),
      isQuestionLoaded: true,
      setMainParameters: true,
    };

    render(
      <BrowserRouter>
        <LoadResumeComponent {...props} />
      </BrowserRouter>
    );

    expect(screen.getByText("Everything is ready!")).toBeInTheDocument;
  });

  test("if apiKey not loaded", () => {
    vi.spyOn(globalThis.localStorage.__proto__, "getItem").mockReturnValue(
      null
    );

    render(
      <BrowserRouter>
        <LoadResumeComponent />
      </BrowserRouter>
    );

    expect(screen.getByText("Please, enter your API key first."))
      .toBeInTheDocument;
    expect(screen.getByRole("link")).toBeInTheDocument;
  });

  test("if fetch error", () => {
    vi.spyOn(globalThis.localStorage.__proto__, "getItem").mockReturnValue(
      "api-key"
    );

    const props = {
      setUserResume: vi.fn(),
      setIsQuestionLoaded: vi.fn(),
      setFetchLoading: vi.fn(),
      setFetchError: vi.fn(),
      setQuestions: vi.fn(),
      questions: vi.fn(),
      fetchError: true,
      fetchLoading: false,
      userResume: vi.fn(),
      isQuestionLoaded: true,
      setMainParameters: true,
    };

    render(
      <BrowserRouter>
        <LoadResumeComponent {...props} />
      </BrowserRouter>
    );

    expect(screen.getByText("Request error, please try again"))
      .toBeInTheDocument;
    expect(screen.queryByText("Everything is ready!")).not.toBeInTheDocument;
  });

  test("intial render test", () => {
    vi.spyOn(globalThis.localStorage.__proto__, "getItem").mockReturnValue(
      "api-key"
    );
    vi.spyOn(JSON, "parse").mockReturnValue({
      language: "Russian",
      questionsQuantity: 2,
    });

    const props = {
      setUserResume: vi.fn(),
      setIsQuestionLoaded: vi.fn(),
      setFetchLoading: vi.fn(),
      setFetchError: vi.fn(),
      setQuestions: vi.fn(),
      questions: {},
      fetchError: false,
      fetchLoading: false,
      userResume: vi.fn(),
      isQuestionLoaded: false,
      setMainParameters: vi.fn(),
    };

    render(
      <BrowserRouter>
        <LoadResumeComponent {...props} />
      </BrowserRouter>
    );

    const initialComponent = screen.getByTestId("initialComponent");
    expect(initialComponent).toBeInTheDocument();

    expect(initialComponent).toHaveClass("showParametersAnimation ");
  });

  test("Interview start with online resume", () => {
    vi.spyOn(globalThis.localStorage.__proto__, "getItem").mockReturnValue(
      "api-key"
    );
    vi.spyOn(JSON, "parse").mockReturnValue({
      language: "Russian",
      questionsQuantity: 2,
    });

    const props = {
      setUserResume: vi.fn(),
      setIsQuestionLoaded: vi.fn(),
      setFetchLoading: vi.fn(),
      setFetchError: vi.fn(),
      setQuestions: vi.fn(),
      questions: {},
      fetchError: false,
      fetchLoading: false,
      userResume: vi.fn(),
      isQuestionLoaded: false,
      setMainParameters: vi.fn(),
    };

    render(
      <BrowserRouter>
        <LoadResumeComponent {...props} />
      </BrowserRouter>
    );
  });
});
