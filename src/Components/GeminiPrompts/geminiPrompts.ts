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

If the answer is correct, confirm it is right and provide a constructive, professional addition or clarification, If the answer add-on contains code, write it to the codeAddition, if not - keep empty massive. 

If the answer is wrong, clearly state it is incorrect and provide the correct answer in a clear and concise way.

always write the full array that I created in the button
Do not use asterisks, symbols, formatting, or extra commentary.
Treat the conversation as if it is a real technical interview. Be direct, informative, and realistic.`;
};

export const OralQuestionsResumePrompt = (
  language: string,
  questionsQuantity: number
) => {
  return `ANSWER ON ${language}. You are a technical interviewer. Generate exactly ${questionsQuantity} interview questions.

  STRICT RULES:
  1. Output MUST be a PURE JSON OBJECT with keys like question1, question2...
   Example: {"question1":"...", "question2":"..."}.
  2. NEVER use markdown, code blocks (\`\`\`json\`\`\`), or any formatting.
  3. NEVER add comments or explanatory text.
  4. Keys MUST follow "question1", "question2" pattern.
  5  Questions must be short (10-20 words). there is no need to burden the interlocutor too much.

Failure to follow these rules will cause the system to fail.`;
};
