import { Clock } from "lucide-react";
import React from "react";
import Link from "next/link";
import FavNotes from "./favNotes";
import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";

const RecentNotes = async() => {
  const profile=await initalProfile()
  const recentNotes = await db.note.findMany({
    where: { isDeleted: false,creatorId:profile?.id },
    orderBy: { updatedAt: "desc" },
    take: 3,
    select: {
      id: true,
      name: true,
      content: true,
      Block: true,
      updatedAt: true,
      createdAt: true,
      tag: {
        select: {
          name: true,
        },
      },
    },
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="mt-20 md:ml-65 md:min-w-6xl flex flex-col lg:flex-row gap-10 w-full px-4">
  
      <div className="flex-1 max-w-4xl">
        <div className="flex items-center gap-3 text-md md:text-2xl mb-8">
          <div className="p-2 rounded-lg bg-theme border border-theme ">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold primary-text">Recent notes</h3>
        </div>

        <div className="space-y-6">
          {recentNotes.map((recentNote, key) => (
            <Link href={`/dashboard/${recentNote.id}`} key={recentNote.id}>
            <div
              key={key}
              className="group w-full 
                recent-notes-theme backdrop-blur-sm 
                border border-theme mt-5
                rounded-xl p-6
           
                transition-all duration-300 
                cursor-pointer
                shadow-lg hover:shadow-xl
                transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg md:text-xl font-semibold primay-text group-hover:accent-text transition-colors duration-200 line-clamp-1">
                  {recentNote.name || 'Untitled Note'}
                </h4>
                <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                  {formatTimeAgo(recentNote.updatedAt)}
                </span>
              </div>
              
              <p className="text-sm md:text-base secondary-text mb-4 leading-relaxed line-clamp-3">
                {recentNote.Block && recentNote.Block.length > 0 
                  ? recentNote.Block.map((block) => 
                      block.content.replace(/<[^>]+>/g, "")
                    ).join(" ").slice(0, 200) + "..."
                  : "No content available"
                }
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {recentNote.tag && recentNote.tag.length > 0 ? (
                    recentNote.tag.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium
                          recent-notes-tag-theme 
                          border border-strong
                          rounded-full
                          hover:bg-yellow-400/30 transition-colors duration-200"
                      >
                        {tag.name}
                      </span>
                    ))
                  ) : (
                    <span className="px-3 py-1 text-xs font-medium
                      bg-gray-700/50 text-gray-400 
                      border border-gray-600/50
                      rounded-full">
                      No tags
                    </span>
                  )}
                  {recentNote.tag && recentNote.tag.length > 3 && (
                    <span className="px-3 py-1 text-xs font-medium
                      bg-gray-700/50 text-gray-400 
                      border border-gray-600/50
                      rounded-full">
                      +{recentNote.tag.length - 3} more
                    </span>
                  )}
                </div>
              </div>

     
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
            </div></Link>
          ))}

          {recentNotes.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
                <Clock className="w-8 h-8 text-gray-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-400 mb-2">No recent notes</h4>
              <p className="text-gray-500">Create your first note to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentNotes;