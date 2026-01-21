// Removed Gemini API integration (no longer needed)

// End of Gemini API integration
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDERseSLGGJSlM7k7kOA61ZSGsTOtapzHE";

export const genAI = new GoogleGenerativeAI(API_KEY);

export async function sendMessageToGemini(
    message: string,
    conversationHistory: { role: string; parts: string }[] = []
) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const chat = model.startChat({
        history: conversationHistory.map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.parts }],
        })),
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
}

export async function streamMessageToGemini(
    message: string,
    conversationHistory: { role: string; parts: string }[] = [],
    onChunk: (chunk: string) => void
) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const chat = model.startChat({
        history: conversationHistory.map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.parts }],
        })),
    });

    const result = await chat.sendMessageStream(message);

    let fullText = "";
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullText += chunkText;
        onChunk(chunkText);
    }

    return fullText;
}
