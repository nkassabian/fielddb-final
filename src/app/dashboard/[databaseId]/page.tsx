"use client";

import ERDTableNode from "@/components/ERDTableNode";
import { MenuBar } from "@/components/MenuBar";
import TableSettings from "@/components/TableSettings";
import SimpleFloatingEdge from "@/components/edges/SimpleFloatingEdge";
import { cn } from "@/lib/utils";
import { Shortcuts } from "@/types/Shortcuts";
import { MainNoeStore, RFStore } from "@/zustand/store";
import React, { useCallback, useEffect, useMemo } from "react";
import ReactFlow, {
  Background,
  ConnectionMode,
  Controls,
  Node,
  NodeMouseHandler,
} from "reactflow";
import "reactflow/dist/style.css";
import { shallow } from "zustand/shallow";

interface PageProps {
  params: {
    databaseId: string;
  };
}

const useKeyCombinations = (combinations: Shortcuts[]) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    for (const combo of combinations) {
      const isMatch = combo.keys.every((key) => {
        const normalizedKey = key.toLowerCase();
        if (normalizedKey === "ctrl" || normalizedKey === "command") {
          return event.ctrlKey || event.metaKey;
        }
        return event.key.toLowerCase() === normalizedKey;
      });

      if (isMatch) {
        event.preventDefault(); // Prevent the default browser behavior
        combo.action(); // Execute the specified function
        break; // Break the loop after the first match
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [combinations]);
};

const nodeTypes = { ERDTableNode: ERDTableNode };
const edgeTypes = {
  floating: SimpleFloatingEdge,
};
//[ ]: Change type from ANY
const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const Page = ({ params }: PageProps) => {
  const drawerOpened = MainNoeStore((state) => state.drawerOpened);
  const selectedNode = MainNoeStore((state) => state.selectedNode);
  const setDrawerOpened = MainNoeStore((state) => state.setDrawerOpened);
  const setSelectedNode = MainNoeStore((state) => state.setSelectedNode);
  const appendTableNode = RFStore((state) => state.appendTableNode);
  const generateSQLServer = RFStore((state) => state.generateSQLServer);

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = RFStore(
    selector,
    shallow
  );

  const memoizedTableSettings = useMemo(
    () => (
      <TableSettings drawerOpened={drawerOpened} selectedNode={selectedNode} />
    ),
    [drawerOpened, selectedNode]
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

  useKeyCombinations([
    { keys: ["Ctrl", "A"], action: appendTableNode },
    {
      keys: ["Ctrl", "G"],
      action: generateSQLServer,
    },
    {
      keys: ["Ctrl", "S"],
      action: () => {
        console.log("Save Action");
      },
    },
  ]);
  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <MenuBar />

      <div className="mx-auto w-full max-w-8xl grow lg:flex">
        {/* Left sidebar & main wrapper */}
        <div className="w-24 xl:flex-1 ">
          <div style={{ width: "100%", height: "100%" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodeClick={onNodeDoubleClick}
              onNodesChange={onNodesChange}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              connectionMode={ConnectionMode.Loose}
              onPaneClick={() => {
                setDrawerOpened(false);
              }}
            >
              <Controls />
              <Background />
            </ReactFlow>
          </div>
        </div>

        <div
          className={cn(
            "border-l border-zinc-300 transition-all duration-100 ease-in-out shadow-lg",
            drawerOpened === true ? "w-[25%] max-w-[450px]" : "w-0"
          )}
        >
          {memoizedTableSettings} {/* Render the memoized component */}
        </div>
      </div>
    </div>
  );
};

export default Page;
