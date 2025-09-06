import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { NextResponse } from "next/server";

export async function DELETE(req:Request) {
    try {
        const profile = await initalProfile();
        if (!profile) {
          return NextResponse.json("Unauthorized", { status: 401 });
        }
    
       const { folderId } =await req.json();

        const folder = await db.folder.delete({
        where: { id: folderId, createdById: profile.id },
        });
        return NextResponse.json("deleted imo", { status: 200 });
      } catch (e) {
        console.log(e);
        return NextResponse.json("ERROR ND ALL", { status: 400 });
      }



}