
import { GoogleGenAI } from "@google/genai";

export const generateBirthdayWish = async (): Promise<string> => {
  try {
    // Initialize client here to prevent app crash on load if process is undefined
    // safe access to process.env
    const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : '';
    
    if (!apiKey) {
        console.warn("API Key is missing.");
        return "Happy Birthday Tosin! You're such a chill bro and I'm so grateful for our meetups and talks. I truly value our friendship. Have an amazing year ahead!";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Write a cool and appreciative birthday message for Tosin from his friend Bryan. Mention that he is such a chill bro/friend, that Bryan is grateful for all the meetups and talks, and how much he values the whole relationship. Keep it under 60 words. Make it sound genuine and amazing. End with a short, cool 2-line rhyme.",
    });

    return response.text || "Happy Birthday Tosin! You're such a chill bro and I'm so grateful for our meetups and talks. I truly value our friendship. Have an amazing year ahead!";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "Happy Birthday Tosin! Thanks for being a solid friend and a great guy to talk to. Here's to an amazing year ahead!";
  }
};
