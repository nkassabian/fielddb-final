// store.ts
import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

import initialNodes, { NewerNode } from "./../initialData/nodes";

//TODO: Add color input isOpened state in here, need it to be global

type RFState = {
  nodes: Node[];
  onNodesChange: OnNodesChange;
  updateTableNode: (nodeId: string, tableName: string) => void;
  updateNodeColor: (nodeId: string, color: string) => void;
  updateNodeRowName: (nodeId: string, rowId: number, name: string) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const RFStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  updateTableNode: (nodeId: string, label: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.data = { ...node.data, label };
        }

        return node;
      }),
    });
  },
  updateNodeColor: (nodeId: string, color: string) => {
    console.log(nodeId);
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the cahnges
          node.data = { ...node.data, color };
        }

        return node;
      }),
    });
  },
  updateNodeRowName: (nodeId: string, rowId: number, name: string) => {
    console.log(name);
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          // Create a new object for the updated node
          const updatedNode = {
            ...node,
            data: {
              ...node.data,
              columns: node.data.columns.map((row: { id: number }) => {
                if (row.id === rowId) {
                  // Create a new object for the updated row
                  return { ...row, name };
                }
                return row;
              }),
            },
          };

          return updatedNode;
        }

        return node;
      }),
    }));
  },
}));

// Define the state shape
type SelectedNodeHandler = {
  setDrawerOpened: (value: boolean) => void;
  setSelectedNode: (node: Node<any, string | undefined>) => void;
  drawerOpened: boolean;
  selectedNode: Node<any, string | undefined> | null;
};

// Create your Zustand store
export const MainNoeStore = create<SelectedNodeHandler>((set) => ({
  drawerOpened: false,
  selectedNode: null,
  setDrawerOpened: (value: boolean) =>
    set((state) => ({
      ...state,
      drawerOpened: value,
    })),
  setSelectedNode: (node: Node<any, string | undefined>) =>
    set((state) => ({
      ...state,
      selectedNode: node,
    })),
}));
