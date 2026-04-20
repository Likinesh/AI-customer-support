import { scalekit } from "@/lib/scalekit";
import { NextResponse } from "next/server";

export async function GET() {
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
    const url = scalekit.getAuthorizationUrl(redirectUrl, {
        // Force the login screen every time — prevents auto-login from cached session
        prompt: "login",
    })

    return NextResponse.redirect(url);
}