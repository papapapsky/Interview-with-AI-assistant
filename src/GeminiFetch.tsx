import { GoogleGenAI } from "@google/genai";

type TypeAImodels = {
  model: string;
  contents: string;
  config?: object;
};

export const geminiFetch = async (
  ApiKey: string,
  text: string,
  geminiConfig?: object
) => {
  const AI = new GoogleGenAI({ apiKey: ApiKey });

  const FetchToApi = async () => {
    try {
      const AImodels: TypeAImodels = {
        model: "gemini-2.0-flash",
        contents: text,
        config: geminiConfig,
      };
      const response = await AI.models.generateContent(AImodels);

      return response;
    } catch (error) {
      console.error("Error during API request:", error);
      throw error;
    }
  };

  return FetchToApi();
};
