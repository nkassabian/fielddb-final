// store.ts
import { Node } from "reactflow";
import create from "zustand";

// Define the state shape
type AppState = {
  setDrawerOpened: (value: boolean) => void;
  setSelectedNode: (node: Node<any, string | undefined>) => void;
  drawerOpened: boolean;
  selectedNode: Node<any, string | undefined> | null;
};

// Create your Zustand store
export const useAppStore = create<AppState>((set) => ({
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
