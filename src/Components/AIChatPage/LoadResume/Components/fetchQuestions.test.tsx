import { fetchQuestions } from "./fetchQuestions";
import { vi, type Mock } from "vitest";
import { geminiFetch } from "../../../../GeminiFetch";

vi.mock("../../../../GeminiFetch", () => {
  return {
    geminiFetch: vi.fn(() =>
      Promise.resolve({ text: '{ "testUserResume": "userResume" }' })
    ),
  };
});

const mockedFetchQuestions = () => {
  const setFetchLoading = vi.fn();
  const setFetchError = vi.fn();
  const setQuestions = vi.fn();
  const apiKey = "test-api-key";

  return fetchQuestions({
    setFetchError: setFetchError,
    setFetchLoading: setFetchLoading,
    setQuestions: setQuestions,
    apiKey: apiKey,
  });
};

describe("FetchQuestions test", () => {
  test("usage", async () => {
    const localStorageGetItemSpy = vi
      .spyOn(globalThis.localStorage.__proto__, "getItem")
      .mockImplementation((item) => {
        if (item === "userResume") return "userResume";
      });

    const localStorageSetItemSpy = vi
      .spyOn(globalThis.localStorage.__proto__, "setItem")
      .mockImplementation((item) => {
        if (item === "userResume") return "userResume";
      });

    const mockedGeminiFetch = geminiFetch as Mock;
    const ParseSpy = vi.spyOn(JSON, "parse").mockImplementation(() => {
      return { mocked: true };
    });

    await mockedFetchQuestions();

    expect(ParseSpy).toHaveBeenCalled();
    expect(mockedGeminiFetch).toHaveBeenCalled();
    expect(localStorageGetItemSpy).toHaveBeenCalled();
    expect(localStorageGetItemSpy).toHaveBeenCalledWith("userResume");
    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      "oral responses",
      '{ "testUserResume": "userResume" }'
    );
  });

  test("If Succesfully State Test", async () => {
    const setFetchLoading = vi.fn();
    const setFetchError = vi.fn();
    const setQuestions = vi.fn();
    const apiKey = "test-api-key";

    await fetchQuestions({
      setFetchError: setFetchError,
      setFetchLoading: setFetchLoading,
      setQuestions: setQuestions,
      apiKey: apiKey,
    });

    expect(setFetchError).toHaveBeenCalledWith(false);
    expect(setFetchLoading).toHaveBeenCalledWith(true);
    expect(setFetchLoading).toHaveBeenCalledTimes(2);
    expect(setQuestions).toHaveBeenCalledWith({ mocked: true });
  });

  test("If apiKey missing", async () => {
    const setFetchLoading = vi.fn();
    const setFetchError = vi.fn();
    const setQuestions = vi.fn();
    const apiKey = null;

    const localStorageGetItemSpy = vi
      .spyOn(globalThis.localStorage.__proto__, "getItem")
      .mockImplementation((item) => {
        if (item === "userResume") return "userResume";
      });

    const localStorageSetItemSpy = vi
      .spyOn(globalThis.localStorage.__proto__, "setItem")
      .mockImplementation((item) => {
        if (item === "userResume") return "userResume";
      });

    await fetchQuestions({
      setFetchError: setFetchError,
      setFetchLoading: setFetchLoading,
      setQuestions: setQuestions,
      apiKey: apiKey,
    });

    expect(localStorageGetItemSpy).toHaveBeenCalled();
    expect(localStorageSetItemSpy).not.toHaveBeenCalled();
    expect(setFetchError).toHaveBeenCalledTimes(2);
    expect(setFetchError).toHaveBeenLastCalledWith(true);
  });

  test("If user resume missing", async () => {
    const setFetchLoading = vi.fn();
    const setFetchError = vi.fn();
    const setQuestions = vi.fn();

    vi.spyOn(globalThis.localStorage.__proto__, "getItem").mockReturnValue(
      null
    );

    await fetchQuestions({
      setFetchError,
      setFetchLoading,
      setQuestions,
      apiKey: "test-api-key",
    });

    expect(setFetchError).toHaveBeenCalledWith(true);
    expect(setQuestions).not.toHaveBeenCalled();
  });
});
