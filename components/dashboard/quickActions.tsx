"use client";
import { GitGraph, Plus, ToolCase } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";
import NewNote from "../sidebar/newNote";

const QuickActions = () => {
  const btn = [
    {
      title: "Graph view",
      icon: <GitGraph className="w-7 h-7 primary-text" />,
      onClick: () => {
        router.push("/graph");
      },
    },
  ];
  const router = useRouter();
  return (
    <div className="flex text-xl gap-2 flex-col mt-5">
      <div className="flex text-xl gap-2">
        <ToolCase className="text-orange-300" />
        <p className="font-bold">Quick Actions</p>
      </div>      {btn.map((favNote, key) => (
        <div
          className="w-xs 
          recent-notes-theme
          accent-text
             backdrop-blur-xl 
             rounded-2xl p-3 px-6 
         border border-theme
             shadow-lg hover:shadow-strong
             transition-all duration-300 flex gap-2"
          key={key}
          onClick={favNote.onClick}
        >
          {favNote.icon}
          <p className="text-lg font-semibold primary-text">{favNote.title}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;
