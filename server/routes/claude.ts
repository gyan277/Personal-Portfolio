import { RequestHandler } from "express";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export const handleTranslate: RequestHandler = async (req, res) => {
  const { text, targetLanguage, languageName, context } = req.body;

  if (!text || !targetLanguage || !languageName) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  if (targetLanguage === "en") {
    res.json({ translated: text });
    return;
  }

  try {
    const message = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are an expert translator specializing in Ghanaian languages.
Translate the following ${context || "civic policy"} text into ${languageName}.
Keep the translation natural, clear and accessible to ordinary Ghanaian citizens.
Return ONLY the translated text, nothing else.

Text to translate:
${text}`,
        },
      ],
    });

    const translated =
      message.content[0].type === "text" ? message.content[0].text : text;

    res.json({ translated });
  } catch (error: any) {
    console.error("Claude translation error:", error);
    res.status(500).json({ error: "Translation failed", translated: text });
  }
};

export const handleSimplify: RequestHandler = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ error: "Missing text" });
    return;
  }

  try {
    const message = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `You are a civic education expert in Ghana.
Summarize the following policy into exactly 3 clear, simple bullet points that ordinary Ghanaian citizens can understand.
Each bullet should be one sentence maximum.
Return as a JSON object with a "bullets" array of exactly 3 strings.

Policy text:
${text}`,
        },
      ],
    });

    const content =
      message.content[0].type === "text" ? message.content[0].text : "{}";

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { bullets: [] };

    res.json({ bullets: parsed.bullets || [] });
  } catch (error: any) {
    console.error("Claude simplify error:", error);
    res.status(500).json({ error: "Simplification failed", bullets: [] });
  }
};
