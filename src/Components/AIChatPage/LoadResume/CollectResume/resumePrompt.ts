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
  return `RESPOND STRICTLY IN ${language}. 
You are an experienced technical interviewer. 
Carefully analyze this resume: ${userResume}

Generate EXACTLY ${questionsQuantity} short, precise, theoretical interview questions relevant to the candidate’s profession. 
NO explanations, NO comments, NO markdown, NO lists, NO triple backticks. 

Your response MUST BE a valid JSON object ONLY, following this STRICT format:
{"question1":"...","question2":"...","question3":"..." etc.} 

MANDATORY RULES:
- Each key MUST be named exactly: question1, question2, question3, etc. No deviations. 
- Only plain text values for questions. No quotes inside values, no special characters, no punctuation other than standard question marks. 
- Each question MUST be a single sentence. Keep them concise and realistic. 
- ABSOLUTELY NO code-writing questions. Only oral theoretical discussion. 
- Questions MUST be domain-relevant: if the resume is not about programming, generate questions about the candidate’s actual profession. 
- Output MUST be valid JSON and parseable without errors. 
- Do not add any characters, comments, text, or formatting outside the JSON object.

FAILURE TO FOLLOW THESE RULES INVALIDATES THE OUTPUT.`;
};
