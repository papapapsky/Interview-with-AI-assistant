export const checkAnswerPrompt = (tasks: string, userCodeResponse: string) => {
  return `You are a strict technical interviewer.

Evaluate the candidate's code strictly based on the task.

Task description:
${tasks}

Candidate's code:
${userCodeResponse}

Return ONLY this JSON object without any explanation or formatting:

{"checkCorrectlyAnswer": true/false}

ASK WITHOUT triple backticks
DO NOT wrap your answer in triple backticks.
DO NOT use markdown.
DO NOT include any extra text or formatting. Output only the JSON object.`;
};

export const generateTasksPrompt = (
  userLanguage: string,
  userResume: string
) => {
  return `ANSWER ON ${userLanguage}. This is my resume - ${userResume},
   please create 3 technical tasks for my technology stack. 
   Write the kind of tasks that are mostly asked at interviews in my field and level. 
   exampleCode IS REQUIRED! Your response must have 3 keys: taskExplanation, exampleCode, technologies.`;
};
