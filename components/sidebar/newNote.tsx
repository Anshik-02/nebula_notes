"use client";
import { Edit } from "lucide-react";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/hooks/use-note-store";

export default function NewNote() {
  const router = useRouter();

  const addNote = useNoteStore((state) => state.addNote);

  const newPageReq = async () => {
    try {
      const response = await axios.post("/api/pages/create");
      addNote(response.data);
      router.push(`/dashboard/${response.data.id}`);
    } catch (err) {
      console.error("Failed to create note", err);
    }
  };

  return (
<button onClick={() => newPageReq()} 
className="px-7 w-55 py-2 rounded-lg mt-5  text-white font-medium 
                  btn-gradient
                   hover:opacity-90 transition cursor-pointer">
  + New Note
</button>

  );
}
