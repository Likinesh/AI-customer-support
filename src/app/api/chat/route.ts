import connectDB from "@/lib/db";
import Settings from "@/model/settings-model";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, ownerId } = await request.json();
    // console.log(message);
    if (!message || !ownerId) {
      return NextResponse.json(
        { message: "Message and ownerId are required" },
        { status: 400 },
      );
    }

    await connectDB();
    const settings = await Settings.findOne({ ownerId });
    if (!settings) {
      return NextResponse.json(
        { message: "Settings not found for the given ownerId" },
        { status: 404 },
      );
    }

    const knowledge = `
    business name- ${settings.businessName || "not provided"}
    support email- ${settings.supportEmail || "not provided"}
    knowledge base- ${settings.knowledgeBase || "not provided"}
    `;

    const prompt = `
You are a friendly and professional customer support assistant for this business.

Answer the customer's question using ONLY the information provided in the BUSINESS INFORMATION section.

Rules:
- For greetings, pleasantries, or small talk (e.g. "hello", "hi", "thanks"), respond naturally and warmly. Do NOT say "Please contact support" for these.
- For actual business questions, answer ONLY using the BUSINESS INFORMATION section below.
- Do NOT use outside knowledge to answer business questions.
- Do NOT make assumptions, invent policies, pricing, features, or guarantees.
- If a business question cannot be answered from the provided information, respond exactly with: "Please contact support"
- If the answer is only partially available, use only what is known and do not guess the rest.


Style:
- Be clear, polite, and concise.
- Answer naturally as a support agent would.
- Do not mention "the provided information" or explain your reasoning.

-----------------------
BUSINESS INFORMATION:
-----------------------
${knowledge}

-----------------------
CUSTOMER QUESTION:
-----------------------
${message}

-----------------------
ANSWER:
-----------------------`;

    // AI model
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const res = await ai.models.generateContent({
            model: "gemini-2.5-flash",
      contents: prompt,
          });
    const response = NextResponse.json({ response: res.text });
    // console.log(response);
    // console.log("res.text", res.text);
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  } catch (error) {
    console.error("Error processing the request:", error);
    const response = NextResponse.json(
      { message: "An error occurred while processing the request" },
      { status: 500 },
    );
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  }
}

export const OPTIONS = async () => {
  return NextResponse.json(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  })
};