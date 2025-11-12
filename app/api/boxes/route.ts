// app/api/boxes/route.ts
import { NextResponse } from "next/server";
import { boxes } from "@/lib/mock-data";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json({ items: boxes });
}
