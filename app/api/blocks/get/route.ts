import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const noteId = searchParams.get("noteId");
const profile=await initalProfile()
    if (!profile) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

  if (!noteId) {
    return NextResponse.json({ message: "Missing noteId" }, { status: 400 });
  }

  try {
    const blocks = await db.block.findMany({
      where: { noteId },
      orderBy: { position: "asc" },
    });

    return NextResponse.json({ blocks });
  } catch (error) {
    console.error("Error fetching blocks:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}