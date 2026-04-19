import connectDB from "@/lib/db";
import Settings from "@/model/settings-model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { ownerId, businessName, supportEmail, knowledgeBase } =
      await request.json();
    if (!ownerId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }
    await connectDB();
    const settings = await Settings.findOneAndUpdate(
      { ownerId },
      { ownerId, businessName, supportEmail, knowledgeBase },
      { new: true, upsert: true }
    );
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error creating settings:", error);
    return NextResponse.json(
      { message: "Failed to create settings" },
      { status: 500 },
    );
  }
}