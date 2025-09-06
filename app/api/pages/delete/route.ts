import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("pageId");

    const profile = await initalProfile();
    if (!profile) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    if (!noteId) return NextResponse.json("Missing pageId", { status: 400 });

    const deletedNote = await db.note.update({
      where: { id: noteId },
      data:{isDeleted:true}
    });

    return NextResponse.json(deletedNote, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json("ERROR ND ALL", { status: 400 });
  }
}