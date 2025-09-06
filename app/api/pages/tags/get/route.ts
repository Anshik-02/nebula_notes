import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {


    const profile = await initalProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
const notes = await db.note.findMany({
  where: {
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
    const tags = notes.flatMap(note => note.tag.map(t => t.name));

    if (!notes) {
      return NextResponse.json( "Untitled" );
    }

    return NextResponse.json( {notes, tags });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
