import { describe, expect, vi, type Mock } from "vitest";
import { geminiFetch } from "./GeminiFetch";

vi.mock("@google/genai", () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(() => ({
      models: {
        generateContent: vi.fn().mockResolvedValue({
          response: "mocked response",
        }),
      },
    })),
  };
});

describe("geminiFetch", () => {
  test("could to return mocked answer", async () => {
    const response = await geminiFetch("fake-api-key", "Hello Gemini!");
    expect(response).toEqual({ response: "mocked response" });

    const { GoogleGenAI } = await import("@google/genai");
    expect(GoogleGenAI).toHaveBeenCalledWith({ apiKey: "fake-api-key" });

    const GoogleGenAIMock = GoogleGenAI as Mock;

    const instance = GoogleGenAIMock.mock.results[0].value;
    expect(instance.models.generateContent).toHaveBeenCalledWith({
      model: "gemini-2.0-flash",
      contents: "Hello Gemini!",
      config: undefined,
    });
  });
});
