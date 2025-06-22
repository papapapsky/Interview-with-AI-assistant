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
  return `ANSWER ON ${language}. This is a question: ${question}, This is my answer on this question: ${userAnswer} .Please rate this answer as wrong or right, and then give a constructive addition to the answer if it is correct, and if it is wrong, tell me the correct answer. Answer without **, * and other seems like symbols.`;
};

export const OralQuestionsResumePrompt = (
  language: string,
  questionsQuantity: number
) => {
  return `RESPONSE ON ${language}. Please make me ${questionsQuantity} questions that are asked at an interview for a programmer position in this form. WRITE ONLY QUESTIONS Something like this: 
        {"qustion1":"question","qustion2":"question"}. 
        WITHOUT TRIPLE QUOTES
        Write only a questions.`;
};
