import RecentNotes from "@/components/dashboard/recentNotes";
import NewNote from "@/components/sidebar/newNote";
import ThemeDropdown from "@/components/theme-dropdown";
import PlanetScene from "@/components/three/PlanetScene";
import { db } from "@/lib/db";
import { initalProfile } from "@/utils/initial-profile";
import { Lightbulb, Notebook, NotebookPen, Text } from "lucide-react";
import { redirect } from "next/navigation";



export default async function Dashboard() {
const profile=await initalProfile();
if (!profile) {
  redirect("/sign-in"); 
}

  const totalNotes= await db.note.count({
    where: { isDeleted: false,creatorId:profile.id},
  }); 

  const NotesThisWeek=await db.note.count({
    where: {
      isDeleted: false,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7))
      }
      ,creatorId:profile.id
    }
  });


  


const cards = [
  {
    title: "Total Notes",
    number: totalNotes,
    icon: <Lightbulb className="w-6 h-6 text-blue-400" />,
    color: "text-blue-400"
  },
  {
    title: "Notes this week",
    number: NotesThisWeek,
    icon: <Notebook className="w-6 h-6 text-green-400" />,
    color: "text-green-400"
  },
  {
    title: "Total words",
    number: 0,
    icon: <Text className="w-6 h-6 text-purple-400" />,
    color: "text-purple-400"
  },
  {
    title: "Avg words/Notes",
    number: totalNotes,
    icon: <NotebookPen className="w-6 h-6 text-orange-400" />,
    color: "text-orange-400"
  },
];



  return (
    <div className="h-full overflow-y-auto overflow-hidden flex items-center flex-col primary-text relative">
      <PlanetScene />
      
      <div className="flex flex-col items-center backdrop-blur-[2px] w-full max-w-7xl px-4 relative z-10">
        <div className="text-center mb-12 mt-20">
          <h1 className="text-4xl md:text-5xl font-bold primary-text mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome to Nebula Notes
          </h1>
          <h3 className="text-lg md:text-xl accent-text font-light mb-6">
            Organize your mind, explore the cosmos.
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ThemeDropdown />
           <span className="md:hidden"><NewNote/></span>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 w-full max-w-5xl">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="recent-notes-theme backdrop-blur-xl border-theme border rounded-xl p-4 md:p-6 
                hover:shadow-strong transition-all duration-300 group cursor-pointer
                transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-gray-800/50 group-hover:scale-110 transition-transform duration-200`}>
                  {card.icon}
                </div>
                <div className={`text-xl md:text-2xl font-bold primary-text ${card.color}`}>
                  {card.number}
                </div>
              </div>
              <div className="text-sm md:text-base secondary-text font-medium">
                {card.title}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full md:w-fit">
          <RecentNotes/>
        </div>
      </div>
    </div>
  );
}