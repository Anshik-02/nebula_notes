import { Star } from "lucide-react";
import React from "react";
import QuickActions from "./quickActions";
import { db } from "@/lib/db";


const FavNotes = async() => {

const favNotes = await db.note.findMany({
    where: { isStarred: true, isDeleted: false },
    orderBy: { updatedAt: "desc" },
    take: 3,
    select: {
      id: true,
      name: true,
      content: true,
      Block:true,
      updatedAt: true,
      createdAt: true,
      tag: {
        select: {
          name: true,
        },
      },
    },

 })

  return (
    <div className="md:flex text-xl gap-2 flex-col  hidden">
      <div className="flex text-xl gap-2">
        <Star className="text-orange-300" />
        <p className="font-bold">Favorite Notes</p>
      </div>
      {favNotes.map((favNote, key) => (
        <div
          className="w-xs 
    recent-notes-theme
             backdrop-blur-xl 
             rounded-2xl p-6 mb-4
             border border-theme
             shadow-lg hover:shadow-strong
             transition-all duration-300"
          key={key}
        >
          <p className="text-lg font-semibold secondary-text">
            {favNote.name}
          </p>
          <p className="text-sm primary-text mt-2 leading-relaxed">
            {favNote.Block.map((block) => (
              <span
                key={block.content}>
                  {block.content.replace(/<[^>]+>/g, "").slice(0, 100)}
                </span>))}  
          </p>
          <p className="mt-2 flex flex-wrap gap-2">
            {favNote.tag.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-white/10 px-2 py-1 rounded-full border border-white/20"
              >
                {tag.name}
              </span>
            ))}
          </p>
        </div>
      ))}
      <QuickActions />
    </div>
  );
};

export default FavNotes;
