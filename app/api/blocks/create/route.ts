import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await initalProfile();

    const { noteId, blocks } = await req.json();
    if (!noteId || !Array.isArray(blocks)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    
    if (!profile) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const updates = await Promise.all(
      blocks.map((block: any) =>
        db.block.upsert({
          where: { id: block.id },
          update: {
            content: block.content,
            type: block.type,
            position: block.position,
          },
          create: {
            id: block.id,
            content: block.content,
            type: block.type,
            position: block.position,
            noteId: noteId,
          },
        })
      )
    );
    return NextResponse.json({ success: true, blocks: updates });
  } catch (e) {
    console.log(e);
    return NextResponse.json("ERROR ND ALL", { status: 400 });
  }
}