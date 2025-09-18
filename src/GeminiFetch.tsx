export const geminiFetch = async (
  ApiKey: string,
  text: string,
  geminiConfig?: object
) => {
  try {
    const AImessage = await fetch("http://31.169.124.125:3000/fetchToGemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ApiKey: ApiKey,
        text: text,
        geminiConfig: geminiConfig,
      }),
    });

    const geminiResponse = await AImessage.json();
    return geminiResponse;
  } catch (err) {
    console.log(err);
  }
};
