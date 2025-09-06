import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="mt-10 flex justify-center items-center mb-20 flex-col">
      <p className="text-xl font-bold">Good Morning,Ask Ai imo</p>
      <div className="w-10 h-10 rounded-full ">.</div>
      <div className="w-2xl h-10 relative">
        <Input />
        <Search className="absolute top-1 right-1" />
      </div>
      <div className="w-4xl p-8  border-1 border-zinc-500 mt-20 rounded-xl text-start text-zinc-200">
        <ul className="font-semibold text-2xl  m-1      ">Some Features imo</ul>
        <li>Instant AI responses</li>
          <li>Search optimized answers</li>
          <li>Clean & responsive UI</li>
          <li>Feature-rich and fast</li>
      </div>
      <div className="w-full absolute top-190 flex gap-10 justify-center items-center">
        <div className="border-1 border-zinc-500 rounded-xl w-lg h-40"></div>
        <div className="border-1 border-zinc-500 rounded-xl w-lg h-40"></div>
      </div>
    </div>
  );
}
