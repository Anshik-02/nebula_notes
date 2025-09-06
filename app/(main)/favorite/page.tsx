import StarField2 from '@/components/starFeild2';
import { db } from '@/lib/db';
import { initalProfile } from '@/utils/initial-profile';
import { Archive, ArchiveRestore, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const FavoriteNotes = async() => {
    const profile = await initalProfile();
  
    const response = await db.note.findMany({
      where: { creatorId: profile.id
        ,isStarred:true,
        isDeleted:false
       },
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
        tag:true,
        isStarred:true,
      },
    });
    return (
        <div
      
      className="h-full bg-theme overflow-auto flex  flex-col primary-text"
    >
      <StarField2 />
      <div className="md:ml-10 md:mr-10 mt-8 flex flex-col  md:px-0 px-4">
        <h3 className="font-semibold text-3xl md:text-start text-center">Favorite Notes</h3>
        <p className="secondary-text mt-2 font-extralight md:text-start text-center">
        Notes marked Favorite by you
        </p>
     {response.map((note, key) => (
          <Link key={key} href={`/dashboard/${note.id}`}>
          <div
            className="w-full 
            recent-notes-theme
             backdrop-blur-xl 
             rounded-2xl p-6 mb-4
             border border-theme
             shadow-lg hover:shadow-strong 
             transition-all duration-300 mt-10 flex justify-between cursor-pointer"
           
          >
            <div>
            <p className="text-2xl font-semibold primart-text">{note.name}</p>
            {note.Block?.map((block, i) => (
  <div
    key={i}
    className="text-sm mt-2 secondary-text leading-relaxed line-clamp-2 sm:line-clamp-3 break-words"
  >
    {block.content.replace(/<[^>]+>/g, "")} {/* strip HTML tags */}
  </div>
))}
            <div className="flex gap-2 mt-3 flex-wrap">
                {note.tag.map((tags, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full 
                   recent-notes-tag-theme secondary-text
                   border border-purple-500/30"
                  >
                    {tags.name}
                  </span>
                ))}
              </div>
              </div>
              <div className="flex gap-3 text-blue-300">
                <Star className="animate-pulse text-yellow-300" />
              </div>
          </div></Link>
        ))}
      </div>
      
    </div>
    );
}

export default FavoriteNotes;
