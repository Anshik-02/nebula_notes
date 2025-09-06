import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
  try {

const {query,tags}=await req.json();

    const profile = await initalProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const note = await db.note.findMany({
      where: {
tag
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
