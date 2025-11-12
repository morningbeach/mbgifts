// app/api/gifts/route.ts
import { NextResponse } from "next/server";
import { gifts } from "@/lib/mock-data";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json({ items: gifts });
}
