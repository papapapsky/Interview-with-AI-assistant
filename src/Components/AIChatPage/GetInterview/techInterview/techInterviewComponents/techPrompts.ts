export const checkAnswerPrompt = (tasks: string, userCodeResponse: string) => {
  return `You are a strict technical interviewer.

Evaluate the candidate's code strictly according to the task requirements.

Task:
${tasks}

Candidate's code:
${userCodeResponse}

Return ONLY this JSON object:
{"checkCorrectlyAnswer": true/false}

Your answer must be fully objective and based only on correctness and completeness of the solution.
evaluate code without taking into account minor syntax errors (missing colons)

DO NOT include backticks, DO NOT use markdown, DO NOT add any explanation or comments.
Reply with the JSON object only. No surrounding text.
`;
};

export const generateTasksPrompt = (
  userLanguage: string,
  userResume: string
) => {
  return `STRICT INSTRUCTIONS: Generate exactly 3 technical interview tasks based on the resume.

REQUIRED OUTPUT FORMAT: A valid JavaScript object only, with no additional text, explanations, or formatting.

OUTPUT TEMPLATE:
{
  "tasks": [
    {
      "taskExplanation":  ["string", "string"] (30-50 lines max),
      "exampleCode": ["string", "string"] (30-50 lines max),
      "technologies": "string", "string" (separated by space and commas)
    },
    {
      "taskExplanation": "string (interview-style question)", 
      "exampleCode": ["string", "string"] (30-50 lines max),
      "technologies": "string", "string" (separated by space and commas)
    },
    {
      "taskExplanation": "string (interview-style question)",
      "exampleCode": ["string", "string"] (30-50 lines max), 
      "technologies": "string", "string" (separated by space and commas)
    }
  ]
}

STRICT REQUIREMENTS:
1. Language: ${userLanguage}
2. Base ALL tasks exclusively on this resume: ${userResume}
3. Each task must reflect real-world interview challenges for the candidate's level
4. If resume indicates non-programmer, use problem-solving questions with written explanations
5. Maximum 50 lines of code per exampleCode
6. Technologies array must contain specific technologies from the resume
7. Tasks must be challenging and test deep understanding
8. No introductory text, no markdown, no code formatting in the response
9. Only tech Tasks, no oral responses (code example as an example).
10. If you write some example or code, please place in backticks this word
11. All important moments in task take in **, make more of these moments
12. All code moments take in backticks
13. The code example may not contain code, for example, if the person is not a programmer. Keep this in mind.

ABSOLUTELY NO: 
- Additional explanations outside the object structure  
- Placeholder text or generic examples
- Tasks unrelated to the resume content
- Tasks for oral answer, only answer in code (if the person is a programmer)

RETURN ONLY: The raw JavaScript object as specified.`;
};
