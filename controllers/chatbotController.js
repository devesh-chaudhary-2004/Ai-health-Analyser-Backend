import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_ID = "gemini-2.0-flash";

export const chatWithAI = async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ 
        success: false, 
        error: "Message is required" 
      });
    }

    // System prompt for health assistant
    const systemPrompt = `You are a helpful and professional AI Health Assistant. Your role is to provide:
- Health-related information and general wellness advice
- Dietary recommendations
- Exercise and yoga suggestions
- Stress management tips
- Sleep improvement advice
- Symptom guidance (with appropriate disclaimers)

IMPORTANT GUIDELINES:
1. Always remind users to consult healthcare professionals for serious medical concerns
2. Never provide medical diagnoses - only general information and advice
3. Be empathetic, supportive, and clear in your responses
4. Provide practical, actionable advice when possible
5. If asked about specific symptoms like fever, provide helpful information about general management but emphasize consulting a doctor if symptoms persist or worsen

Respond in a friendly, conversational manner. Keep responses concise but informative (2-4 paragraphs max).`;

    // Combine system prompt with user message
    const fullPrompt = `${systemPrompt}\n\nUser question: ${message}\n\nProvide a helpful response:`;

    const model = genai.getGenerativeModel({
      model: MODEL_ID,
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();

    if (!text) {
      return res.status(502).json({ 
        success: false, 
        error: "Empty response from AI" 
      });
    }

    res.status(200).json({
      success: true,
      message: text,
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process chat message",
      details: error.message,
    });
  }
};

