import { Filter } from "lucide-react";
import React from "react";
import TagComponent from "./tagComponent";

const FilterComponent = () => {
  return (
    <div className="md:ml-10 mt-20">
      <div className="flex items-center  gap-1">
        <Filter className="text-purple-300" />
        <p className="text-white text-lg">Filters</p>
      </div>
      <p className="text-purple-300 text-sm mt-10"># Filter by Tags</p>
      <TagComponent />
    </div>
  );
};

export default FilterComponent;
