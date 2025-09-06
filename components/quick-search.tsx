import { Search } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export default function QuickSearch() {
  return (
    <div>
      <Button className="w-xs flex items-center ">
        <Search />
        <p>Search the cosmos</p>
      </Button>
    </div>
  );
}
