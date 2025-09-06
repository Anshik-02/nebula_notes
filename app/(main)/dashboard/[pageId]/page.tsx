import TiptapWithTitle from "@/components/title";
import MultiBlockEditor from "@/components/multi-block";
import StarField from "@/components/starFeild";
import TagInput from "@/components/tag";
import React from "react";
import ThemeDropdown from "@/components/theme-dropdown";

export default function PageId() {
  return (
    <div
      className="relative min-h-screen w-full 
  bg-theme 
  text-white flex flex-col px-4 overflow-y-auto"
    >
   <div className="absolute top-4 right-4 z-10">
    <ThemeDropdown/>
   </div>
      <StarField/>
      <div
        className="
    mt-8 mx-auto w-full md:max-w-5xl
    rounded-2xl
    bg-white/5 dark:bg-white/10
    backdrop-blur-md
    border border-white/20
    shadow-xl
    p-4 sm:p-6 md:p-8
    space-y-6
  ">
        <TiptapWithTitle />
        <TagInput />
        <MultiBlockEditor />
      </div>
    </div>
  );
}
