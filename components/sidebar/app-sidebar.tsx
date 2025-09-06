import { initalProfile } from "@/utils/initial-profile";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import ActionToolTip from "../tooltip";
import ScrollAreaa from "./sidebar-scrollarea";
import EditButton from "./edit-button";
import NotesPagesName from "./notes-pages";
import { Bolt } from "lucide-react";
import NewNote from "./newNote";
import { Separator } from "../ui/separator";

export default async function AppSidebar() {
  const profile = await initalProfile();
  if (!profile) {
    return redirect("/");
  }

  return (
    <div className="!w-70 fixed hidden md:block  top-0 left-0 z-10 sidebar-theme  p-1 pt-2 h-screen border-r border-theme overflow-y-auto overflow-hidden ">
      <div className="w-full mt-4 flex items-center justify-between p-1 rounded-sm text-[#D1D1D1] flex-col">
        <div className="flex  items-center gap-2 ">
          <span className="w-10 h-10 rounded-xl sidebar-theme flex justify-center items-center text-3xl">
            🪐
          </span>
          <span className="flex items-start justify-center  flex-col">
            <h3>NEBULA NOTES</h3>
            <p className="text-xs font-light accent-text">Your notes app</p>
          </span>
        </div>
        <NewNote/>
        <Separator className="border border-light mt-8"/>

      </div>
      <ScrollAreaa />
      <NotesPagesName />
    </div>
  );
}
