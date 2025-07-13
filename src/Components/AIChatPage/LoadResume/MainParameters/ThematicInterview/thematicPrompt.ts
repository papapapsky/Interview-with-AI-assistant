type topicProps = {
  topic: string;
  questionsQuantity: number;
  language: string;
};

export const thematicPrompt = ({
  topic,
  questionsQuantity,
  language,
}: topicProps) => {
  return `RESPONSE ON ${language}. 
  You are my interviewer, i want you to create a test for me with ${questionsQuantity}
  questions on the topic: ${topic}.
  
You are to generate only a JavaScript object.

Do not include any explanation, no markdown formatting, no backticks, no comments, no quotation outside of key-value structure. Do not write “Here is the object”, “This is JSON”, or anything else.

Only output the object itself, and nothing else.

Keys must be question1, question2, question3, etc.  
Values must be strings containing questions suitable for the profession mentioned in the resume. If it is clear the person is not a programmer, ask questions related to their actual profession. Make the questions sound as if asked in a real interview.

Output ONLY this object. Nothing before, nothing after. Not even a dot or newline.
`;
};
