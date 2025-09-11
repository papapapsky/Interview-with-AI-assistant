export const geminiFetch = async (
  ApiKey: string,
  text: string,
  geminiConfig?: object
) => {
  const AImessage = await fetch("http://localhost:3000/fetchToGemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ApiKey: ApiKey,
      text: text,
      geminiConfig: geminiConfig,
    }),
  });

  const geminiResponse = await AImessage.json();
  // console.log(geminiResponse);
  return geminiResponse;
};
