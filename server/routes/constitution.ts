import { RequestHandler } from "express";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

export const handleConstitution: RequestHandler = async (req, res) => {
  const { question } = req.body;
  if (!question) { res.status(400).json({ error: "No question provided" }); return; }

  try {
    const message = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      system: `You are a knowledgeable civic education assistant specializing in the 1992 Constitution of Ghana. 
Your role is to help ordinary Ghanaian citizens understand their rights, the structure of government, and constitutional provisions.

Guidelines:
- Answer clearly and simply so any citizen can understand
- Reference specific chapters and articles when relevant (e.g., "Article 21 of the Constitution...")
- Be accurate and educational
- Keep answers concise but complete (3-5 paragraphs max)
- Use examples relevant to everyday Ghanaian life
- If asked about something outside the Ghana Constitution, politely redirect to constitutional topics
- Always be encouraging about civic participation`,

      messages: [{ role: "user", content: question }],
    });

    const answer = message.content[0].type === "text" ? message.content[0].text : "I could not process your question. Please try again.";
    res.json({ answer });
  } catch (error) {
    console.error("Constitution AI error:", error);
    res.status(500).json({ answer: "Sorry, I am unable to answer right now. Please try again shortly." });
  }
};
