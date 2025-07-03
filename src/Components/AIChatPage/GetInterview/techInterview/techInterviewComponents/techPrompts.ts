export const checkAnswerPrompt = (tasks: string, userCodeResponse: string) => {
  return `You are a strict technical interviewer.

  Evaluate the candidate's code strictly based on the task.

  Task description:
  ${tasks}

  Candidate's response:
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
  return `ANSWER ON ${userLanguage} AND WITHOUT TRIPLE QUOTES. You are my interviewer and you have to test me on my knowledge of my technology stack and focus, make up questions that are similar to real ones from real tech interviews. This is my resume - ${userResume},
   please create 3 technical tasks for my technology stack.
   
  if it is clear from the resume that the person is not a programmer, then also make up 3 questions that need to be answered in detail. As a replacement for the "code solution", write a verbal solution to the problem. the keys of the objects being transferred do not need to be renamed.
   Write the kind of tasks that are mostly asked at interviews in my field and level.
   
  TASKS SHOULD NOT BE VERY LONG, THE MAIN TASK IS TO TEST ME FOR KNOWLEDGE OF MY STACK, these could be algorithms or creating or SMALL COMPONENT. the implementation should not exceed 30-50 lines of code. The tasks must be difficult enough and show my skills!  
   exampleCode IS REQUIRED! Your response must have 3 keys: taskExplanation, exampleCode, technologies.`;
};
