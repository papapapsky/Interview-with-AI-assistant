type TypeResumePropmpts = {
  language: string;
  userResume: string;
  questionsQuantity: number;
};

type TypeUserResumePrompt = {
  name: string;
  direction: string;
  age: string;
  education: string;
  experience: string;
  techStack: string;
  petProjects: string;
};

export const userResumePrompt = ({
  name,
  direction,
  age,
  education,
  experience,
  techStack,
  petProjects,
}: TypeUserResumePrompt): string => {
  return `Hi, My name is ${name}.
   im a ${direction} developer, im a ${age} years old. 
   I have ${education} education and ${experience} years experience. 
   My stack: ${techStack}. This is my pet-projects: ${petProjects}.`;
};

export const generateQuestionsPrompt = ({
  language,
  userResume,
  questionsQuantity,
}: TypeResumePropmpts) => {
  return `PLEASE, ANSWER ON ${language}. You are my interviewer. ${userResume} Please make me ${questionsQuantity} questions that are asked at an interview for a programmer position in this form. WRITE ONLY QUESTIONS Something like this: 
    {"qustion1":"question","qustion2":"question"}. 

    If it is clear from the resume that the person is not a programmer, the composition of questions for him that correspond to his profession, which he indicated in the resume. The structure of the source and the names of the keys remain the same.
    reply with javascript object only.
    Ask questions and treat them as if you were in a real conversation at a real interview as an interviewer.
    NAME OF THE KEYS PROPRIETARY question1, question2 etc.
    WITHOUT TRIPLE QUOTES
    Write only a questions.`;
};
