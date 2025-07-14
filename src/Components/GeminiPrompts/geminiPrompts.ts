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
  return `ANSWER IN ${language}. You are my technical interviewer.
Here is the question: ${question}
Here is my answer: ${userAnswer}

Evaluate the answer as either right or wrong. Then:

If the answer is correct, confirm it is right and provide a constructive, professional addition or clarification.

If the answer is wrong, clearly state it is incorrect and provide the correct answer in a clear and concise way.

Do not use asterisks, symbols, formatting, or extra commentary.
Treat the conversation as if it is a real technical interview. Be direct, informative, and realistic.`;
};

export const OralQuestionsResumePrompt = (
  language: string,
  questionsQuantity: number
) => {
  return `RESPONSE IN ${language}. Act as my technical interviewer. Generate exactly ${questionsQuantity} real interview questions for a programmer position in the following strict format:
{"question1":"question","question2":"question",...}

Only provide questions. No explanations, no formatting, no markdown, no triple backticks.

Each key must strictly follow the format: question1, question2, question3, etc.
Do not use any characters, symbols, words, or signs outside the object.

Questions must not require writing code — only verbal technical discussion is allowed.
If it is clear from the resume that the candidate is not a programmer, generate domain-relevant questions based on the candidate's profession.

This must look like a real technical interview. Keep it realistic, precise, and concise. Only return the object with the questions.`;
};
