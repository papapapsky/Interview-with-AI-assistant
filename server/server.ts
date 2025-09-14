import express, { type Request, type Response } from "express";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const cleanAndWrap = (rawText: string) => {
  let text = rawText.trim();

  if (text.startsWith('"') && text.endsWith('"')) {
    text = text.slice(1, -1);
  }

  text = text
    .replace(/^```json\s*/i, "")
    .replace(/^```javascript\s*/i, "")
    .replace(/^```python\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "");

  return text;
};

const geminiFetch = async (
  ApiKey: string,
  text: string,
  geminiConfig?: any
) => {
  const AI = new GoogleGenerativeAI(ApiKey);

  try {
    const model = AI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const allowedKeys = ["temperature", "topP", "topK", "maxOutputTokens"];
    const filteredConfig: any = {};

    if (geminiConfig) {
      for (const key of allowedKeys) {
        if (geminiConfig[key] !== undefined) {
          filteredConfig[key] = geminiConfig[key];
        }
      }
    }

    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text }] }],
      ...filteredConfig,
    });

    if (
      response.response &&
      response.response.candidates?.[0]?.content?.parts?.[0]?.text
    ) {
      const cleaned = cleanAndWrap(
        response.response.candidates[0].content.parts[0].text
      );
      response.response.candidates[0].content.parts[0].text = cleaned;
    }

    return response;
  } catch (error) {
    console.error("Error during API request:", error);
    throw error;
  }
};

app.post("/fetchToGemini", async (req: Request, res: Response) => {
  const { ApiKey, text, geminiConfig } = req.body;

  try {
    const geminiResponse = await geminiFetch(ApiKey, text, geminiConfig);

    if (!geminiResponse) {
      return res.status(400).json({ response: false });
    }

    const output =
      geminiResponse.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      null;

    return res.status(201).json({ response: output });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/getApiKey", async (req: Request, res: Response) => {
  const srcToKeys = path.resolve(__dirname, "keys", "keys.json");
  const keys: string = await fs.readFile(srcToKeys, "utf-8");

  const parsedKeys = JSON.parse(keys);
  const numOfKeys = parsedKeys.length;
  const randomNumber = Math.floor(Math.random() * (numOfKeys + 1));

  const pickedKey: string = parsedKeys[randomNumber];

  if (pickedKey) {
    return res.status(200).json({ key: pickedKey });
  } else {
    return res.status(400);
  }
});

app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
