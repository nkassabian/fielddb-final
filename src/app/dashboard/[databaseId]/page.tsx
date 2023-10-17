"use client";

import React, { ReactNode, useCallback, useMemo, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
  NodeMouseHandler,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { cn } from "@/lib/utils";
import TableSettings from "@/components/TableSettings";
import { useStore } from "zustand";
import { useAppStore } from "@/zustand/store";

interface PageProps {
  params: {
    databaseId: string;
  };
}

//TODO: Add previous node
const Page = ({ params }: PageProps) => {
  const drawerOpened = useAppStore((state) => state.drawerOpened);
  const selectedNode = useAppStore((state) => state.selectedNode);
  const setDrawerOpened = useAppStore((state) => state.setDrawerOpened);
  const setSelectedNode = useAppStore((state) => state.setSelectedNode);

  const memoizedTableSettings = useMemo(
    () => <TableSettings drawerOpened={drawerOpened} />,
    [drawerOpened]
  );

  /**
   * Handle double-click event on a node in React Flow.
   *
   * @param {React.MouseEvent} event - The React MouseEvent object.
   * @param {Node<any, string | undefined>} node - The node that was double-clicked.
   */
  const onNodeDoubleClick: NodeMouseHandler = useCallback(
    (event: React.MouseEvent, node: Node<any, string | undefined>) => {
      if (selectedNode !== node) {
        setDrawerOpened(false);
        setTimeout(() => {
          setSelectedNode(node);
          setDrawerOpened(true);
        }, 100);
      } else {
        setDrawerOpened(!drawerOpened);
      }
    },
    [selectedNode]
  );

  const memoizedReactFlow = useMemo(() => {
    const initialNodes = [
      { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
      { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
    ];

    return (
      <ReactFlow
        nodes={initialNodes}
        onNodeClick={onNodeDoubleClick}
        onPaneClick={() => {
          setDrawerOpened(false);
        }}
      >
        <Controls />
        <Background />
      </ReactFlow>
    );
  }, [onNodeDoubleClick]);

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex">
        {/* Left sidebar & main wrapper */}
        <div className="w-24 px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 ">
          <div style={{ width: "100%", height: "100%" }}>
            {memoizedReactFlow}
          </div>
        </div>

        <div
          className={cn(
            "border-l border-zinc-300 transition-all duration-100 ease-in-out shadow-lg",
            drawerOpened === true ? "w-[25%]" : "w-0"
          )}
        >
          {memoizedTableSettings} {/* Render the memoized component */}
        </div>
      </div>
    </div>
  );
};

export default Page;
