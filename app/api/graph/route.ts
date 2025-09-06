import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
  try {

    const profile = await initalProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

  const user = await db.user.findUnique({
  where: { id: profile.id }, 
  include: {
    notes:{where:{isDeleted:false},
      select: {
        id: true,
        name: true,   
        folders: { select: { id: true, name: true } },
        tag: { select: { id: true, name: true } },
      }
    },
    Folder: {
      include: { children: true, notes: true }
    }
  }
});

 if (!user) return new NextResponse("Not found", { status: 404 });

    const nodes: any[] = [];
    const links: any[] = [];

    // Add notes
    user.notes.forEach((note) => {
      nodes.push({ id: `note-${note.id}`, name: note.name, type: "note" });

      if (note.folders) {
        links.push({
          source: `note-${note.id}`,
          target: `folder-${note.folders.id}`,
        });
      }

       if (note.tag && note.tag.length > 0) {
    note.tag.forEach((t) => {

      if (!nodes.find((n) => n.id === `tag-${t.id}`)) {
        nodes.push({ id: `tag-${t.id}`, name: t.name, type: "tag" });
      }

      links.push({
        source: `note-${note.id}`,
        target: `tag-${t.id}`,
      });
    });
  }
    });
 

      user.Folder.forEach((folder) => {
      nodes.push({ id: `folder-${folder.id}`, name: folder.name, type: "folder" });

      folder.notes.forEach((n) =>
        links.push({ source: `folder-${folder.id}`, target: `note-${n.id}` })
      );

      folder.children.forEach((child) =>
        links.push({
          source: `folder-${folder.id}`,
          target: `folder-${child.id}`,
        })
      );
    });

 user.notes.forEach((note) => {
      if (note.tag) {
        nodes.push({ id: `tag-${note.tag.id}`, name: note.tag.name, type: "tag" });
      }
    });

      return NextResponse.json({ nodes, links });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
