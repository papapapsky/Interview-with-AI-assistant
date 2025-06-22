import { Type } from "@google/genai";

export const interviewConfig = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        answerStatus: {
          type: Type.STRING,
        },
        explanation: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
        additionToAnswer: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
      },
      propertyOrdering: ["answerStatus", "explanation", "additionToAnswer"],
    },
  },
};

export const techInterviewConfig = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        taskExplanation: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
        exampleCode: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
        technologies: {
          type: Type.STRING,
        },
      },
      propertyOrdering: ["taskExplanation", "exampleCode", "technologies"],
    },
  },
};

export const gptAnswerToCode = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        Answer: {
          type: Type.BOOLEAN,
        },
      },
      propertyOrdering: ["Answer (true or false)"],
    },
  },
};
