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
          type: Type.OBJECT,
          properties: {
            additionText: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            codeAddition: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["additionText", "codeAddition"],
        },
      },
      propertyOrdering: ["answerStatus", "explanation", "additionToAnswer"],
    },
  },
};

type questionsObject = {
  [type: string]: { type: Type.STRING };
};

export const oralQuestionConfig = (questionQuantity: number) => {
  const questionsObject: questionsObject = {};

  for (let i = 0; i < questionQuantity; i++) {
    questionsObject[`question${i + 1}`] = { type: Type.STRING };
  }

  return {
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      properties: questionsObject,

      additionalProperties: false,
      propertyNames: {
        pattern: "^question\\d+$",
      },
    },

    formatOptions: {
      json: {
        stripTextMarkers: true,
      },
    },
  };
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
