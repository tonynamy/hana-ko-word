import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const words = await prisma.word.findMany();
  return NextResponse.json(words);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  await prisma.word.create({
    data,
  });
  return NextResponse.json({ success: true });
}
