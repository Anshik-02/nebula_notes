import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const profile = await initalProfile();

    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const tags = searchParams.getAll("tags"); // ?tags=crzy&tags=oyehoye
    const query = searchParams.get("query") || ""; // ?query=hello

    let whereClause: any = {
      creatorId: profile.id,
      isDeleted: false,
    };

    // Apply search query filter
    if (query) {
      whereClause.OR = [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          Block: {
            some: {
              content: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        },
      ];
    }

    // Apply tags filter if any
    if (tags.length > 0) {
      whereClause.tag = {
        some: {
          name: {
            in: tags,
            mode: "insensitive",
          },
        },
      };
    }

    const notes = await db.note.findMany({
      where: whereClause,
      select: {
        id: true,
        creatorId: true,
        Block: true,
        name: true,
        folderId: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        isPinned: true,
        isDeleted: true,
        isStarred: true,
        tag: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
