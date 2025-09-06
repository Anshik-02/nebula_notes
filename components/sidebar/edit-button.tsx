"use client";
import { Edit } from "lucide-react";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/hooks/use-note-store";

export default function EditButton() {
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
    <button onClick={() => newPageReq()}>
      <Edit className="w-5 h-5 primary-text cursor-pointer" />
    </button>
  );
}
