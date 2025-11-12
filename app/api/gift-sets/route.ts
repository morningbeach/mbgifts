// app/api/gift-sets/route.ts
import { NextResponse } from "next/server";
import { giftSets } from "@/lib/mock-data";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json({ items: giftSets });
}
