"use client"
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const TagInput = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const params = useParams();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(`/api/pages/tags?PageId=${params.pageId}`);
        setTags(res.data.tags);
      } catch (err) {
        console.error("Error fetching tags:", err);
      }
    };
    fetchTags();
  }, [params.pageId]);

  const saveTag = async (newTag: string) => {
    try {
      const response = await axios.post("/api/pages/tags/create", {
        pageId: params.pageId,
        tag: newTag,
      });

      if (response.status === 200) {
        const tagNames = response.data.tag.map((t: { id: string; name: string }) => t.name);
        setTags(tagNames);
        setInput("");
      }
    } catch (error) {
      console.error("Error saving tag:", error);
    }
  };

  const addTag = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e && e.key === "Enter") || !e) {
      if (input.trim() !== "") {
        e?.preventDefault();
        saveTag(input.trim());
      }
    }
  };

  const removeTag = async (tagToRemove: string) => {
    try {
      const response = await axios.patch("/api/pages/tags/delete",
     { pageId: params.pageId, tag: tagToRemove },
      );

      if (response.status === 200) {
        setTags(response.data.tags);
      }
    } catch (err) {
      console.error("Error deleting tag:", err);
    }
  };

  return (
    <div className="flex w-full md:max-w-3xl mx-auto flex-wrap gap-2 items-center ml-5 md:ml-28">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="bg-theme px-3 py-1 rounded-full 
            flex items-center border-strong border gap-2 text-sm sm:text-base"
        >
          {tag}
          <button
            onClick={() => removeTag(tag)}
            className="text-xs text-rose-400"
          >
            ✕
          </button>
        </span>
      ))}
      <div className="flex items-center ">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={addTag}
          placeholder="Add tag..."
          className="bg-transparent w-19 outline-none focus-outline:none text-purple-200 
            primary-text text-sm sm:text-base"
        />
        <button
          onClick={() => addTag()}
          className="bg-theme text-purple-200 rounded-full px-3 py-1 text-sm hover:bg-purple-600/60"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default TagInput;
