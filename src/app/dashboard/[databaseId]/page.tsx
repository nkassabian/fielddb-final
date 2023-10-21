"use client";

import ERDTableNode from "@/components/ERDTableNode";
import { MenuBar } from "@/components/MenuBar";
import TableSettings from "@/components/TableSettings";
import SimpleFloatingEdge from "@/components/edges/SimpleFloatingEdge";
import { cn } from "@/lib/utils";
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

  const handleKeyPress = useCallback(
    (event: {
      ctrlKey: any;
      metaKey: any;
      key: string;
      preventDefault: () => void;
    }) => {
      // Check if the Ctrl (or Command on Mac) key and Shift key are pressed
      if ((event.ctrlKey || event.metaKey) && event.key === "a") {
        event.preventDefault();

        // Call your custom function here
        customFunction();
      }
    },
    []
  );

  const customFunction = () => {
    appendTableNode();
  };

  useEffect(() => {
    // Attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // Remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

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
