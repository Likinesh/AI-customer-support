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
    You are a professional customer support assistant for this business.

Answer the customer's question using ONLY the information provided in the BUSINESS INFORMATION section.

Rules:
- Do NOT use outside knowledge.
- Do NOT make assumptions or fill in missing details.
- Do NOT invent policies, pricing, features, or guarantees.
- If the answer is only partially available, respond using only the known information and do not guess the rest.
- If the question cannot be answered using the provided information, respond exactly with:
  "Please contact support"

Style:
- Be clear, polite, and concise.
- Do not mention "the provided information" or explain your reasoning.
- Answer naturally as a support agent would.

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
    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!});

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents:prompt,
    });
    return NextResponse.json(res.text);

  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { message: "An error occurred while processing the request" },
      { status: 500 },
    );
  }
}
