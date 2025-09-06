import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
  try {

    const profile = await initalProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const folders = await db.folder.findMany({
      where: {
        createdById: profile.id,
      },
    });


    return NextResponse.json(folders);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
