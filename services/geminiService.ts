import { GoogleGenAI, Type } from "@google/genai";
import { HolidayMagicResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateHolidayMagic = async (wish: string): Promise<HolidayMagicResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `The user's holiday wish or theme is: "${wish}". 
      Generate a short, luxurious, poetic Christmas greeting (max 15 words). 
      Also, pick a hex color code for ornaments and a hex color code for lights that matches the mood of the wish (e.g., cold wish = silver/blue, warm wish = gold/red, nature = green/copper). 
      The style must be "Luxury", "High-End", "Cinematic".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            greeting: { type: Type.STRING },
            ornamentColor: { type: Type.STRING },
            lightColor: { type: Type.STRING },
          },
          required: ["greeting", "ornamentColor", "lightColor"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as HolidayMagicResponse;
    }
    throw new Error("No response text");
  } catch (error) {
    console.error("Gemini Magic Error:", error);
    // Fallback in case of error
    return {
      greeting: "Golden Wishes & Emerald Dreams.",
      ornamentColor: "#E5E4E2", // Platinum
      lightColor: "#FFD700",
    };
  }
};
