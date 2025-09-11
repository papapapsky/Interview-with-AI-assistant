export const geminiValidation = (geminiAnswer: object[]): boolean => {
  const answerKeys = ["taskExplanation", "exampleCode", "technologies"];

  if (geminiAnswer.length !== answerKeys.length) return false;
  return geminiAnswer.every((item) => {
    const keys = Object.keys(item);
    if (keys.length !== answerKeys.length) {
      return false;
    }
    return keys.every((key) => answerKeys.includes(key));
  });
};
