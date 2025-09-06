"use client"
import { Edit2, GitGraph, Home, NotebookPen, Search, Star  } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import Link from "next/link";

const icons = [
  {
    title: "Home",
    icon: Home,
    pathname:"/dashboard"
  },
   {
    title: "All notes",
    icon: NotebookPen,
    pathname:"/notes"
  },
  {
    title: "Favorite Notes",
    icon: Star,
    pathname:"/favorite"
  },
  {
    title: "Search",
    icon: Search,
    pathname:"/search"
  },
  
  {
    title: "Graph view",
    icon: GitGraph,
    pathname:"/graph"

  },
 
];
export default function ScrollAreaa() {
const pathname=usePathname()
const router=useRouter()

  return (
    <div>
   <ScrollArea>
  {icons.map((icon, key) => (
   <Link key={key}
   href={icon.pathname}>
      <div
      
      className={cn(
        "flex items-center gap-2 px-4 py-3 mx-5 my-2 cursor-pointer rounded-md select-none",
        "primary-text transition-all duration-200 ease-in-out",
        "hover:tag-hover hover:text-blue-100 hover:translate-x-1",
        {
          "bg-theme text-blue-50 border border-strong shadow-sm":
            icon.pathname === pathname,
        }
      )}
 
    >
      <icon.icon className="w-5 h-5 ml-1 transition-transform duration-200" />
      <p className="font-semibold text-sm">{icon.title}</p>
    </div></Link>

  ))}
</ScrollArea>
 <Separator className="border border-soft" />
    </div>
  )
}
