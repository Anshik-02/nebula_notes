import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const profile = await initalProfile();
        if (!profile) {
          return NextResponse.json("Unauthorized", { status: 401 });
        }
    
        const {name}=await req.json()
        const folder = await db.folder.create({
          data: {
            name: name,
            createdById: profile.id,
          },
        });
        return NextResponse.json(folder, { status: 200 });
      } catch (e) {
        console.log(e);
        return NextResponse.json("ERROR ND ALL", { status: 400 });
      }



}