import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); // load .env.local

const client = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function listModels() {
    try {
        const response = await client.models.list();
        console.log(response.data); // prints all available models
    } catch (err) {
        console.error("Error listing models:", err);
    }
}

listModels();