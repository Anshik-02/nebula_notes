import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { pageId, tag } = await req.json();

    const profile = await initalProfile();
    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!pageId) {
      return NextResponse.json({ error: "Missing pageId" }, { status: 400 });
    }


    const updatedNote = await db.note.update({
      where: { id: pageId },
      data: {
        tag: {
          disconnect: { name: tag },
        },
      },
      include: { tag: true }, 
   
    });


    return NextResponse.json(
      { tags: updatedNote.tag.map((t) => t.name) },
      { status: 200 }
    );
  } catch (e) {
    console.error("Tag delete error:", e);
    return NextResponse.json({ error: "Failed to delete tag" }, { status: 400 });
  }
}
