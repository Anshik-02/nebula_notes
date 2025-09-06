"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(input);
    }, 400);
    return () => clearTimeout(handler);
  }, [input, onSearch]);

  return (
    <input
      className="w-full bg-gray-300 h-12 text-purple-600 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
      placeholder="🔍 Search your notes"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

const TagComponent = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState<any[]>([]);

  // Fetch tags once
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(`/api/pages/tags/get`);
        setTags([...new Set(res.data.tags || [])]);
      } catch (err) {
        console.error("Error fetching tags:", err);
      }
    };
    fetchTags();
  }, []);

  // Fetch notes when tags OR query changes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const params = new URLSearchParams();
        if (query) params.append("query", query);
        selectedTags.forEach((tag) => params.append("tags", tag));

        const res = await axios.get("/api/notes/search?" + params.toString());
        setNotes(res.data.notes || []);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };
    fetchNotes();
  }, [query, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl px-4 md:px-6 py-10 flex flex-col gap-6">
        {/* Search bar */}
        <SearchBar onSearch={setQuery} />

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <span
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full cursor-pointer transition ${
                  isSelected
                    ? "bg-purple-600 text-white"
                    : "bg-purple-600/30 text-purple-300 hover:bg-purple-600/40"
                }`}
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* Notes */}
        <div className="mt-6 flex flex-col gap-6">
          {notes.length === 0 && (
            <p className="text-center text-sm text-gray-400">
              No notes found. Try another search or tag.
            </p>
          )}

          {notes.map((note) => (
            <Link key={note.id} href={`/dashboard/${note.id}`}>
              <div
                className="recent-notes-theme
                  backdrop-blur-xl 
                  rounded-2xl p-6
                  border border-theme
                  shadow-lg hover:shadow-strong 
                  transition-all duration-300
                  cursor-pointer"
              >
                <p className="text-2xl font-semibold primary-text">
                  {note.name}
                </p>

                {note.Block?.map((block, i) => (
                  <div
                    key={i}
                    className="text-sm mt-2 secondary-text leading-relaxed 
                               line-clamp-2 sm:line-clamp-3 break-words"
                  >
                    {block.content.replace(/<[^>]+>/g, "")}
                  </div>
                ))}

                {/* Tags inside each note */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {note.tag.map((tagg, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full 
                        recent-notes-tag-theme secondary-text
                        border border-theme"
                    >
                      {tagg.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagComponent;
