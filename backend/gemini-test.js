
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function testGemini() {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: "Generate one simple MCQ about JavaScript functions."
        });
        console.log(response.text);
    } catch (error) {
        console.error("Gemini API Error:", error);
    }
}

testGemini();
