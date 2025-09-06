import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("pageId");

    if (!noteId) {
      return NextResponse.json({ error: "Missing pageId" }, { status: 400 });
    }


    const profile = await initalProfile();
    if (!profile) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
const note = await db.note.findUnique({where:{id:noteId}});
if(!note){
  return NextResponse.json("Note not found", { status: 404 });
}       
    const updatedNote = await db.note.update({
      where: { id: noteId },
      data: { isStarred:{ set: !(note.isStarred) } },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json("ERROR ND ALL", { status: 400 });
  }
}
