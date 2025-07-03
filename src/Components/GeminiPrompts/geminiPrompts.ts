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
  return `ANSWER ON ${language}. Your are my interviewer. This is a question: ${question}, This is my answer on this question: ${userAnswer} .Please rate this answer as wrong or right, and then give a constructive addition to the answer if it is correct, and if it is wrong, tell me the correct answer.
  treat them as if you were in a real conversation at a real interview as an interviewer.
  Answer without **, * and other seems like symbols.`;
};

export const OralQuestionsResumePrompt = (
  language: string,
  questionsQuantity: number
) => {
  console.log("уебище");
  return `RESPONSE ON ${language}. You are my interviewer. Please make me ${questionsQuantity} questions that are asked at a real interview for a programmer position in this form. WRITE ONLY QUESTIONS Something like this: 
        {"qustion1":"question","qustion2":"question"}. 
        
        If it is clear from the resume that the person is not a programmer, the composition of questions for him that correspond to his profession, which he indicated in the resume. The structure of the source and the names of the keys remain the same.
        Ask questions and treat them as if you were in a real conversation at a real interview as an interviewer.
        NAME OF THE KEYS PROPRIETARY question1, question2 etc.
        WITHOUT TRIPLE BACKTICKS and explanations on the type of json, javascript, etc., make it so that in text there is only an object.
        I ask one more, NO SYMBOLS, WORDS OR SIGNS OUTSIDE THE OBJECT.
        Write only a questions.`;
};
