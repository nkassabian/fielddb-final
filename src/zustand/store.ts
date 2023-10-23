// store.ts
import {
  Edge,
  Node,
  NodeChange,
  OnNodesChange,
  applyNodeChanges,
} from "reactflow";
import { create } from "zustand";

import initialEdges from "./../initialData/edges";
import initialNodes from "./../initialData/nodes";

//TODO: Add color input isOpened state in here, need it to be global

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  updateTableNode: (nodeId: string, label: string) => void;
  updateNodeColor: (nodeId: string, color: string) => void;
  removeColumnFromNode: (nodeId: string, rowId: number) => void;
  getAllTableNames: () => string[];
  getTableRowNames: (tableId: string) => string[];
  updateNodeProperty: (
    nodeId: string,
    rowId: number,
    property: string,
    value: any
  ) => void;
  appendColumnToNode: (nodeId: string) => void;
  appendTableNode: () => void;
  generateSQLServer: () => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const RFStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
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
  updateNodeProperty: (
    nodeId: string,
    rowId: number,
    property: string,
    value: any
  ) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          const updatedNode = {
            ...node,
            data: {
              ...node.data,
              columns: node.data.columns.map((row: { id: number }) => {
                if (row.id === rowId) {
                  return { ...row, [property]: value };
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
  appendColumnToNode: (nodeId: string) => {
    var newColumn = {
      id: 1,
      key: false,
      name: "Column Name",
      type: "int",
    };
    set((state) => {
      // Find the maximum id value in the columns array of the specific node
      const maxId = state.nodes.reduce((max, node) => {
        if (node.id === nodeId) {
          return Math.max(
            ...node.data.columns.map((column: { id: any }) => column.id),
            max
          );
        }
        return max;
      }, 0);

      // Set the id of the new column to one more than the maximum id
      newColumn.id = maxId + 1;

      return {
        nodes: state.nodes.map((node) => {
          if (node.id === nodeId) {
            // Create a new object for the updated node
            const updatedNode = {
              ...node,
              data: {
                ...node.data,
                columns: [...node.data.columns, newColumn], // Append the new column
              },
            };
            return updatedNode;
          }
          return node;
        }),
      };
    });
    const selectedNodeId = MainNoeStore.getState().selectedNode?.id;
    const updatedNode = RFStore.getState().nodes.find(
      (node) => node.id === selectedNodeId
    );

    if (updatedNode) {
      MainNoeStore.getState().setSelectedNode(updatedNode);
    }
  },
  removeColumnFromNode: (nodeId: string, rowId: number) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          const updatedNode = {
            ...node,
            data: {
              ...node.data,
              columns: node.data.columns.filter(
                (row: { id: number }) => row.id !== rowId
              ),
            },
          };
          return updatedNode;
        }
        return node;
      }),
    }));
    const selectedNodeId = MainNoeStore.getState().selectedNode?.id;
    const updatedNode = RFStore.getState().nodes.find(
      (node) => node.id === selectedNodeId
    );

    if (updatedNode) {
      MainNoeStore.getState().setSelectedNode(updatedNode);
    }
  },
  getAllTableNames: () => {
    const tableNames = get()
      .nodes // Assuming 'table' is the type of your tables
      .map((node) => node.data.label);
    return tableNames;
  },
  getTableRowNames: (tableId: string) => {
    const table = get().nodes.find(
      (node) => node.id === tableId && node.type === "table"
    ); // Assuming 'table' is the type of your tables
    if (!table) {
      return [];
    }

    const rowNames = table.data.columns.map((row: any) => row.name);
    return rowNames;
  },
  appendTableNode: () => {
    var name = "table" + Date.now();
    var newNode = {
      id: name,
      type: "ERDTableNode",
      data: {
        label: name,
        color: "#2ecc71",
        columns: [
          {
            id: 1,
            key: true,
            name: "id",
            type: "int",
          },
        ],
      },
      position: {
        x: 0,
        y: 0,
      },
    };
    set((state) => ({
      nodes: [...state.nodes, newNode], // Append the new table node
    }));
  },

  generateSQLServer: () => {
    return console.log(generateSQLFromTableDataArray(get().nodes));
  },
}));

// Define the state shape
type SelectedNodeHandler = {
  setDrawerOpened: (value: boolean) => void;
  setSelectedNode: (node: Node<any, string | undefined>) => void;
  drawerOpened: boolean;
  selectedNode: Node<any, string | undefined> | null;
};

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

function generateSQLFromTableDataArray(tableDataArray: any[]) {
  const sqlStatements = tableDataArray.map((tableData) => {
    if (
      !tableData.id ||
      !tableData.data ||
      !tableData.data.label ||
      !tableData.data.columns
    ) {
      console.error("Invalid table data format.");
      return "";
    }

    const tableName = tableData.data.tablename || tableData.data.label;
    const columns = tableData.data.columns;

    if (!tableName || columns.length === 0) {
      console.error("Invalid table data format.");
      return "";
    }

    const columnSQL = columns
      .map((column: { name: any; type: any; key: any; nullable: boolean }) => {
        if (!column.name || !column.type) {
          console.error("Invalid column data format.");
          return "";
        }

        const columnName = column.name;
        const columnType = column.type;
        const isPrimaryKey = column.key ? " PRIMARY KEY" : "";
        const isNullable = column.nullable === false ? " NOT NULL" : "";

        return `[${columnName}] ${columnType}${isPrimaryKey}${isNullable}`;
      })
      .filter((columnSQL: string | any[]) => columnSQL.length > 0)
      .join(",\n  ");

    if (columnSQL.length === 0) {
      console.error("No valid columns found.");
      return "";
    }

    return `CREATE TABLE IF NOT EXISTS [${tableName}] (\n  ${columnSQL}\n);`;
  });

  return sqlStatements.join("\n\n");
}
