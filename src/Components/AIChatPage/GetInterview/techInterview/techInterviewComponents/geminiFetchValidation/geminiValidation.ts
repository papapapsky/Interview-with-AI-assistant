export const geminiValidation = (geminiAnswer: object[]): boolean => {
  const answerKeys = ["exampleCode", "taskExplanation", "technologies"];

  if (!Array.isArray(geminiAnswer) || geminiAnswer.length !== 3) return false;

  return geminiAnswer.every((item) => {
    const keys = Object.keys(item);
    if (keys.length !== answerKeys.length) return false;

    return keys.every((key) => answerKeys.includes(key));
  });
};
