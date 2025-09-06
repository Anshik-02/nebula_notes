import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { profile } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await initalProfile();
    if (!profile) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const note = await db.note.create({
      data: {
        name: "Untitled",
        creatorId: profile.id,
        content: "",
      },
    });
    return NextResponse.json(note, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json("ERROR ND ALL", { status: 400 });
  }
}


export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("pageId");

    if (!noteId) {
      return NextResponse.json({ error: "Missing pageId" }, { status: 400 });
    }

    const { name } = await req.json();

    const profile = await initalProfile();
    if (!profile) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const updatedNote = await db.note.update({
      where: { id: noteId },
      data: { name:name },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json("ERROR ND ALL", { status: 400 });
  }
}


