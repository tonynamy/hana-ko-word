import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const data = await req.json();
  await prisma.word.update({
    where: { id: Number(id) },
    data,
  });
  return NextResponse.json({ success: true });
};

export const dynamic = "force-static";
