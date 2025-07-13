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

DO NOT include backticks, DO NOT use markdown, DO NOT add any explanation or comments.
Reply with the JSON object only. No surrounding text.
`;
};

export const generateTasksPrompt = (
  userLanguage: string,
  userResume: string
) => {
  console.log(userResume);
  return `You are my technical interviewer. Your job is to realistically test my knowledge of my technology stack from a real-world interview perspective.

ONLY reply with a JavaScript object (no quotes, backticks, or other wrappers). Each task must contain:
- taskExplanation (short, interview-style description),
- exampleCode (30–50 lines maximum),
- technologies (array of specific technologies used in the task).

Use ${userLanguage}.

Base all questions strictly on this resume or technology stack: ${userResume}

Tasks must reflect the actual types of technical challenges candidates are asked during interviews in this field and level. These can include small components, specific algorithms, code optimizations, or typical usage patterns in the given technologies.

If it is clear from ${userResume} that the person is not a programmer, replace technical code tasks with open-ended problem-solving questions requiring detailed verbal answers. In that case, set "exampleCode" to a short written explanation.

You MUST create 3 tasks. The tasks should be challenging and test real understanding. Each task should be concise but not trivial.

DO NOT include any introductory text or extra explanations outside the object. Reply with the JavaScript object only.
`;
};
