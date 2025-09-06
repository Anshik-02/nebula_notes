import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pageId = searchParams.get("pageId");

    if (!pageId) {
      return new NextResponse("Missing pageId", { status: 400 });
    }

    const profile = await initalProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const note = await db.note.findFirst({
      where: {
        id: pageId,
        creatorId: profile.id,
        isDeleted: false,
      },
    });

    if (!note) {
      return NextResponse.json({ content: "Untitled" });
    }

    return NextResponse.json({ content: note});
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
