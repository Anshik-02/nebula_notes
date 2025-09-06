"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useNoteStore } from "@/hooks/use-note-store";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TiptapWithTitle() {
  const params = useParams();
  const pageId = params?.pageId;

  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const titleDebounceRef = useRef<number | null>(null);
  const { updateNote } = useNoteStore();

  useEffect(() => {
    if (!pageId) return;

    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/pages/get?pageId=${pageId}`);
        setTitle(res.data.content.name ?? "");
      } catch (err) {
        console.error("Failed to load note:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [pageId]);

  useEffect(() => {
    return () => {
      if (titleDebounceRef.current) {
        window.clearTimeout(titleDebounceRef.current);
      }
    };
  }, []);

  const onTitleChange = (value: string) => {
    setTitle(value);

    if (titleDebounceRef.current) window.clearTimeout(titleDebounceRef.current);
    titleDebounceRef.current = window.setTimeout(async () => {
      try {
        if (!pageId) return;
        await axios.patch(`/api/pages/create?pageId=${pageId}`, {
          name: value,
        });
      } catch (err) {
        console.error("Failed to save title:", err);
      }
    }, 800);
  };

  if (!pageId) {
    return <div className="text-white">No pageId provided in URL.</div>;
  }

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 mt-20 mb-8">
        <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
          <Skeleton
            height={56}
            width="70%"
            borderRadius={12}
            className="mb-4"
          />
        </SkeletonTheme>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mt-20 mb-8">
      <input
  value={title}
  onChange={(e) => {
    onTitleChange(e.target.value);
    updateNote(pageId, { name: e.target.value });
  }}
  placeholder="Untitled"
  className="
    w-full
    bg-transparent
    text-white
    font-extrabold
    tracking-tight
    text-3xl sm:text-4xl md:text-5xl
    leading-snug
    outline-none focus:outline-none
    break-words
    placeholder:text-zinc-500
    mb-4
  "
/>
    </div>
  );
}
