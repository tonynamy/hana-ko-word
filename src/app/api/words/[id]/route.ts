import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  await prisma.word.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ success: true });
}
