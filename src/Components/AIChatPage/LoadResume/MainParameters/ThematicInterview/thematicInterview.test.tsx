import { useState } from "react";
import { mainContext } from "../../../../../MainContext";
import { ThematicInterview } from "./ThematicInterview";
import type { TypeMainParameters } from "../../../../../MainContext";
import { vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { geminiFetch } from "../../../../../GeminiFetch";

vi.mock("../../../../../GeminiFetch", () => ({
  geminiFetch: vi.fn().mockImplementation(() =>
    Promise.resolve({
      response: true,
      text: "mocked response data",
    })
  ),
}));

const initialState: TypeMainParameters = {
  language: "Russian",
  techInterview: true,
  questionsQuantity: 10,
  loadedUserResume: "userResumeTest",
  interviewType: "fullInterview",
};

describe("thematicInterview test", () => {
  const InitialComponent = (props: any) => {
    vi.spyOn(globalThis.localStorage.__proto__, "getItem").mockReturnValue(
      "api-key"
    );

    const setFetchError = props.setFetchError;
    const setFetchLoading = props.setFetchLoading;
    const setQuestions = props.setQuestions;
    const State = useState<TypeMainParameters>(initialState);

    return (
      <mainContext.Provider value={State}>
        <ThematicInterview
          setFetchError={setFetchError}
          setFetchLoading={setFetchLoading}
          setQuestions={setQuestions}
        />
      </mainContext.Provider>
    );
  };

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("renderTest", () => {
    vi.spyOn(globalThis.localStorage.__proto__, "getItem").mockReturnValue(
      "api-key"
    );

    const props = {
      setFetchError: vi.fn(),
      setFetchLoading: vi.fn(),
      setQuestions: vi.fn(),
    };

    render(<InitialComponent {...props} />);
    expect(screen.getByText("Write a topic")).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();
  });

  test("Thematic interview start test without input text", () => {
    const props = {
      setFetchError: vi.fn(),
      setFetchLoading: vi.fn(),
      setQuestions: vi.fn(),
    };

    render(<InitialComponent {...props} />);
    const startBtn = screen.getByText("Start");
    fireEvent.click(startBtn);
    expect(startBtn).toBeInTheDocument;
  });

  test("Thematic interview start test with input text and no errors", async () => {
    const setItemSpy = vi
      .spyOn(globalThis.localStorage.__proto__, "setItem")
      .mockReturnValue("ThematicPromptText");
    const jsonSpy = vi
      .spyOn(JSON, "parse")
      .mockReturnValue({ text: "testText" });

    (geminiFetch as jest.Mock).mockResolvedValueOnce({
      response: true,
      result: "test interview questions",
    });

    const props = {
      setFetchError: vi.fn(),
      setFetchLoading: vi.fn(),
      setQuestions: vi.fn(),
    };

    render(<InitialComponent {...props} />);
    const startBtn = screen.getByText("Start");
    const input = screen.getByTestId("input");

    expect(startBtn).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    fireEvent.change(input, {
      target: { value: "testText" },
    });
    expect(input).toHaveValue("testText");
    fireEvent.click(startBtn);

    expect(setItemSpy).toHaveBeenCalled();
    expect(geminiFetch).toHaveBeenCalled();
    await waitFor(() => {
      expect(jsonSpy).toHaveBeenCalled();
      expect(setItemSpy).toHaveBeenCalledTimes(2);
      expect(props.setQuestions).toHaveBeenCalledTimes(1);
    });
  });

  test("Thematic interview start test with input text and error (JSON not mocked)", async () => {
    const setItemSpy = vi
      .spyOn(globalThis.localStorage.__proto__, "setItem")
      .mockReturnValue("ThematicPromptText");

    const logErrorSpy = vi.spyOn(console, "error");

    (geminiFetch as jest.Mock).mockResolvedValueOnce({
      response: false,
      result: null,
    });

    const props = {
      setFetchError: vi.fn(),
      setFetchLoading: vi.fn(),
      setQuestions: vi.fn(),
    };

    render(<InitialComponent {...props} />);

    const startBtn = screen.getByText("Start");
    const input = screen.getByTestId("input");

    expect(startBtn).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    fireEvent.change(input, {
      target: { value: "testText" },
    });
    expect(input).toHaveValue("testText");
    fireEvent.click(startBtn);

    expect(setItemSpy).toHaveBeenCalled();
    expect(geminiFetch).toHaveBeenCalled();

    await waitFor(() => {
      //catch
      expect(logErrorSpy).toHaveBeenCalled();
      expect(props.setQuestions).not.toHaveBeenCalledTimes(1);
      expect(props.setFetchLoading).toHaveBeenCalledTimes(2);
    });
  });
});
