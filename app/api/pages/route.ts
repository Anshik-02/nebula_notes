import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const profile = await initalProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const note = await db.note.findMany({
      where: {
        creatorId: profile.id,
        isDeleted:false
      },
      select: {
        id: true,
        name: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        folderId: true,
        isDeleted: true,
        isPinned: true,
        isStarred: true,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("pageId");

    const { folderId } = await req.json();

    const profile = await initalProfile();
    if (!profile) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    if (!noteId) {
      return NextResponse.json("Note id required", { status: 400 });
    }
    const updatedNote = await db.note.update({
      where: { id: noteId },
      data: { folderId: folderId },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json("ERROR ND ALL", { status: 400 });
  } 
}
