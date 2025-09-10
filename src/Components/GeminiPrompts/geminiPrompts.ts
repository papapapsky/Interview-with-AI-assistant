type TypeGeneratePrompt = {
  language: string;
  question: string;
  userAnswer: string;
};

export const aiMessageGeneratePrompts = ({
  language,
  question,
  userAnswer,
}: TypeGeneratePrompt) => {
  console.log("asdasd");
  return `ANSWER IN ${language}. You are my technical interviewer.
Here is the question: ${question}
Here is my answer: ${userAnswer}

STRICT INSTRUCTIONS:
1. Evaluate the answer as either correct or incorrect.
2. Output MUST be a JSON ARRAY of objects with the following structure:
[
  {
    "answerStatus": "correct" or "incorrect",
    "explanation": ["string", "string", ...],
    "additionToAnswer": {
      "additionText": ["string", ...],
      "codeAddition": ["string", ...]
    }
  }
]
3. Do NOT include any backticks (\`\`\`), markdown, formatting symbols, asterisks, or comments.
4. Do NOT add any text outside the JSON array.
5. All arrays must be present even if empty (e.g., "codeAddition": []).
6. Keys and structure MUST exactly match the example above.
7. Output must be directly parsable by JSON.parse without modifications.

Treat this as a real technical interview. Be precise, direct, and professional.`;
};

export const OralQuestionsResumePrompt = (
  language: string,
  questionsQuantity: number
) => {
  return `ANSWER IN ${language}. You are a technical interviewer. 
Generate exactly ${questionsQuantity} interview questions.

STRICT RULES:
1. Your ENTIRE output MUST be a VALID JSON OBJECT, nothing else. 
   Example: {"question1":"...", "question2":"..."}.
2. DO NOT add any code blocks. DO NOT use \`\`\`json, \`\`\`, or backticks at all.
3. DO NOT add markdown, comments, explanations, or extra text outside the JSON.
4. Keys MUST strictly follow the pattern "question1", "question2", ..., up to "question${questionsQuantity}".
5. Each value must be a short question (10–20 words). Avoid long or overly complex phrasing.
6. Output must be directly parsable by JSON.parse without modifications.

If you include anything other than the pure JSON object, the result will be considered invalid.`;
};
