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
  console.log("asdasdasdasdmkjashdkljasjhkldj");
  return `PLEASE, RESPOND IN ${language}.
You are an experienced technical interviewer.
Use this resume: ${userResume}
Create exactly ${questionsQuantity} questions that are relevant to a real job interview for the candidate based on their resume.

following strict format:
{"question1":"question","question2":"question",...}

Only provide questions. No explanations, no formatting, no markdown, no triple backticks.

Each key must strictly follow the format: question1, question2, question3, etc.
Do not use any characters, symbols, words, or signs outside the object.

Questions must not require writing code — only verbal technical discussion is allowed.
If it is clear from the resume that the candidate is not a programmer, generate domain-relevant questions based on the candidate's profession.

This must look like a real technical interview. Keep it realistic, precise, and concise. Only return the object with the questions.`;
};
