import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const words = await prisma.word.findMany();
  return NextResponse.json(words);
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  console.log(data);
  await prisma.word.create({
    data,
  });
  return NextResponse.json({ success: true });
};

export const dynamic = "force-static";
