"use client";

import { useTheme } from "@/context/theme-context";

export default function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  const themes: { label: string; value: any }[] = [
    { label: "Nebula", value: "nebula" },
    { label: "Mercury", value: "mercury" },
    { label: "Venus", value: "venus" },
    { label: "Earth", value: "earth" },
    { label: "Mars", value: "mars" },
    { label: "Jupiter", value: "jupiter" },
    { label: "Saturn", value: "saturn" },
    { label: "Uranus", value: "uranus" },
    { label: "Neptune", value: "neptune" },
  ];

  return (
    <div className="relative inline-block">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
        className="
          px-3 py-2 
          rounded-xl
          bg-gray-900/80 backdrop-blur-sm
          border border-gray-700
          text-white text-sm font-medium
          shadow-sm
          cursor-pointer
          transition-all duration-200
          hover:bg-gray-800/80 hover:border-gray-600
          focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
        "
      >
        {themes.map((t) => (
          <option
            key={t.value}
            value={t.value}
            className="bg-gray-900 text-white"
          >
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
}
  