"use client";
import StarField2 from "@/components/starFeild2";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Graphmodal = dynamic(
  () => import("../../../components/graph/graphmodal"),
  {
    ssr: false,
  }
);

const Page = () => {
  const [data, setData] = useState<{ nodes: any[]; links: any[] }>({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    fetch("/api/graph")
    .then((res) => res.json())
    .then((data) => {
      console.log("Graph Data:", data); 
      setData(data); 
    })
  }, []);

  return (
    <div className="flex-1 h-screen relative">
      <Graphmodal graphData={data}
       />
    </div>
  );
};

export default Page;
