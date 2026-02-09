
import { GoogleGenAI } from "@google/genai";
import { RAW_CSV_DATA, SYSTEM_INSTRUCTION } from "../constants";

export const callGemini = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const fullSystemInstruction = `${SYSTEM_INSTRUCTION}\n\nData CSV:\n${RAW_CSV_DATA}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { 
        systemInstruction: fullSystemInstruction, 
        temperature: 0.1 
      }
    });
    
    return response.text || "Maaf, sistem JOMRUMAHBOT tidak dapat memproses data buat masa ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
