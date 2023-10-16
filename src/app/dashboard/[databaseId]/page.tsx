"use client";

import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
} from "reactflow";

import "reactflow/dist/style.css";

import {
  ArrowDownUpIcon,
  ChevronsUpDown,
  DatabaseBackupIcon,
  DatabaseZap,
  Loader2,
  LucideX,
} from "lucide-react";
import "reactflow/dist/style.css";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import TableSettings from "@/components/TableSettings";

interface PageProps {
  params: {
    databaseId: string;
  };
}
const Page = ({ params }: PageProps) => {
  const [drawerOpened, setDrawerOpened] = useState<boolean>(true);

  const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  ];
  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex">
        {/* Left sidebar & main wrapper */}
        <div className="w-24 px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 ">
          <Button
            onClick={() => {
              setDrawerOpened(!drawerOpened);
            }}
          >
            Open
          </Button>
          <div style={{ width: "100%", height: "100%" }}>
            <ReactFlow nodes={initialNodes}>
              <Controls />
              <MiniMap />
              <Background />
            </ReactFlow>
          </div>
        </div>
        <div
          className={cn(
            " border-l border-zinc-300 transition-all duration-200 ease-in-out shadow-lg",
            drawerOpened == true ? "w-[25%]" : "w-0"
          )}
        >
          <TableSettings drawerOpened={drawerOpened} />
        </div>
      </div>
    </div>
  );
};

export default Page;
