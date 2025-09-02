const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI (process.env.GEMINI_API_KEY);

const generateResponse = async (chatHistory) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:  chatHistory,
  });

  return response.text;
};

module.exports = generateResponse;
