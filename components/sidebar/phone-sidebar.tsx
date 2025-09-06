"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import ScrollAreaa from "./sidebar-scrollarea";
import NotesPagesName from "./notes-pages";
import NewNote from "./newNote";

export default function PhoneSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-transparent hover:bg-white/10 transition"
      >
        <Menu className="h-6 w-6 text-white" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar-theme fixed inset-y-0 left-0 z-50 w-64 flex flex-col shadow-xl border-r border-light 
        transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-md text-white opacity-70 hover:opacity-100"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        {/* Sidebar Body */}
        <div className="flex-1 overflow-y-auto px-3 pt-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-10 h-10 rounded-xl flex justify-center items-center text-3xl bg-theme">
              🪐
            </span>
            <span className="flex flex-col">
              <h3 className="font-semibold primary-text">NEBULA NOTES</h3>
              <p className="text-xs font-light accent-text">Your notes app</p>
            </span>
          </div>

          <NewNote />
          <hr className="border border-light my-6" />

          <ScrollAreaa />
          <NotesPagesName />
        </div>
      </div>
    </div>
  );
}
