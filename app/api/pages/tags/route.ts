import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pageId = searchParams.get("PageId");

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
  },
  select: {
    id: true,
    name: true,
    tag: {
      select: { name: true }
    }
  },
});

const tags = note?.tag.map(t => t.name) || [];

    if (!note) {
      return NextResponse.json( "Untitled" );
    }

    return NextResponse.json( { ...note, tags });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
