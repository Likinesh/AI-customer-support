import connectDB from "@/lib/db";
import Settings from "@/model/settings-model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { ownerId } = await request.json();
    if (!ownerId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }
    await connectDB();
    const settings = await Settings.findOne(
      { ownerId }
    );
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { message: "Failed to fetch settings" },
      { status: 500 },
    );
  }
}