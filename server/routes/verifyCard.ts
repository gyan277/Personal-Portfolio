import { RequestHandler } from "express";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

export const handleVerifyCard: RequestHandler = async (req, res) => {
  const { imageBase64 } = req.body;

  if (!imageBase64) {
    res.status(400).json({ error: "No image provided" });
    return;
  }

  try {
    const message = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: imageBase64,
              },
            },
            {
              type: "text",
              text: `Analyze this image. Determine if it is a Ghana National Identification Card (Ghana Card).

If it IS a Ghana Card, extract:
1. The full name on the card
2. The date of birth (in YYYY-MM-DD format)

Return ONLY a JSON object like this:
{
  "isGhanaCard": true,
  "name": "KWAME MENSAH",
  "dateOfBirth": "1995-03-15"
}

If it is NOT a Ghana Card (wrong document, blurry, not a card, etc.), return:
{
  "isGhanaCard": false,
  "name": null,
  "dateOfBirth": null
}

Return ONLY the JSON, nothing else.`,
            },
          ],
        },
      ],
    });

    const content = message.content[0].type === "text" ? message.content[0].text : "{}";
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const result = jsonMatch ? JSON.parse(jsonMatch[0]) : { isGhanaCard: false };

    res.json(result);
  } catch (error) {
    console.error("Card verification error:", error);
    res.status(500).json({ isGhanaCard: false, error: "Verification failed" });
  }
};
