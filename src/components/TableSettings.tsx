import { cn } from "@/lib/utils";
import TableSettingsRow from "./TableSettingsRow";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { Check, Trash2 } from "lucide-react";
import { NewerNode } from "@/initialData/nodes";
import { RFStore } from "@/zustand/store";
import { useEffect, useState } from "react";
import TableRelationshipsRow from "./TableRelationshipsRow";
// import TableRelationshipsRow from "./TableRelationshipsRow";

const TableSettings = ({
  drawerOpened,
  selectedNode,
}: {
  drawerOpened: boolean;
  selectedNode: NewerNode | null;
}) => {
  const updateTableName = RFStore((s) => s.updateTableNode);
  const updateNodeColor = RFStore((s) => s.updateNodeColor);
  const appendColumnToNode = RFStore((s) => s.appendColumnToNode);
  const onNodesChange = RFStore((s) => s.onNodesChange);

  const [tableName, setTableName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ff0000");
  const [columns, setColumns] = useState(null);

  useEffect(() => {
    if (selectedNode != null) {
      console.log(selectedNode);
      setColumns(selectedNode.data.columns);
    }
  }, [selectedNode, onNodesChange]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (selectedNode !== null) {
      setTableName(selectedNode.data.label);
    } else {
      setTableName(""); // Handle the case where selectedNode is null
    }
  }, [selectedNode]);

  useEffect(() => {
    console.log("Log");
    if (selectedNode != null) {
      setSelectedColor(selectedNode?.data.color);
    }
  }, [selectedNode]);

  const colorOptions = [
    "#1abc9c",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#16a085",
    "#27ae60",
    "#2980b9",
    "#8e44ad",
    "#f1c40f",
    "#e67e22",
    "#e74c3c",
    "#d35400",
    "#c0392b",
    // Add more color options as needed
  ];

  return (
    <>
      <div className={!drawerOpened ? "hidden" : "visible"}>
        <h1 className="text-2xl m-3 p-5 pb-0">Table Settings</h1>
        <div className="bg-zinc-200 w-full "></div>
        <div
          className={
            "m-5 p-5 border border-zinc-200 bg-white rounded-md transition-all ease-in-out duration-50 "
          }
        >
          <div className="flex gap-5  items-end">
            <div className="flex flex-row gap-2">
              <div className="relative inline-block">
                <button
                  className="w-6 h-6 rounded-md cursor-pointer "
                  style={{ backgroundColor: selectedColor }}
                  onClick={toggleDropdown}
                ></button>

                <div
                  className={
                    "absolute -top-10 right-12 mt-10 w-30 p-1 rounded-md bg-zinc-50 shadow-xl ease-in-out transition-all duration-150 " +
                    (drawerOpened && isOpen ? "opacity-1" : "opacity-0")
                  }
                >
                  <div className="flex flex-wrap">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        className="w-6 h-6 rounded-md cursor-pointer m-1 flex items-center justify-center text-zinc-50"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setSelectedColor(color);
                          if (selectedNode != null) {
                            updateNodeColor(selectedNode?.id, color.toString());

                            setIsOpen(false);
                          }
                        }}
                      >
                        {selectedColor === color ? (
                          <Check className="w-4 h-4 font-bold" />
                        ) : (
                          <></>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/*  */}
              <Input
                className="w-full h-6 p-1"
                type="text"
                value={tableName}
                onChange={(event) => {
                  if (selectedNode != null) {
                    setTableName(event.target.value);

                    updateTableName(selectedNode?.id, event.target.value);
                  }
                }}
              />
            </div>
          </div>
          <div className="border-t my-3 border-zinc-200"></div>
          {selectedNode &&
            selectedNode.data.columns.map(
              (col: {
                key: boolean;
                id: number;
                name: string;
                type: string;
                nullable: boolean;
              }) => (
                <TableSettingsRow
                  drawerOpened={drawerOpened}
                  key={col.id + col.name}
                  tableId={selectedNode?.id}
                  colId={col.id}
                  colName={col.name}
                  dataType={col.type}
                  nullable={col.nullable}
                  isPrimary={col.key}
                />
              )
            )}
          <div className="border-t my-3 border-zinc-200"></div>
          <div
            className={cn(
              "flex flex-row justify-end gap-2 transition-all duration-50 ease-out",
              drawerOpened ? "opacity-1" : "opacity-0"
            )}
          >
            <Button variant={"destructive"} className="flex flex-row gap-2 h-8">
              <Trash2 className="h-4 w-4" />
              Delete Table
            </Button>
            <Button
              className="h-8"
              variant={"ghost"}
              onClick={() => {
                if (selectedNode != null) {
                  appendColumnToNode(selectedNode?.id);
                }
              }}
            >
              Add Column
            </Button>
          </div>
        </div>
      </div>
      <div className="border-t my-3 border-zinc-200"></div>
      <div className={!drawerOpened ? "hidden" : "visible"}>
        <div className="flex flex-row justify-center items-center m-3 p-5 gap-16">
          <h1 className="text-2xl pb-0">Table Relationships</h1>
          <Button>Add New</Button>
        </div>
        <div className="bg-zinc-200 w-full "></div>
        <div
          className={
            "m-5 p-5 border border-zinc-200 bg-white rounded-md transition-all ease-in-out duration-50 "
          }
        >
          <div className="flex gap-5 flex-col">
            <div className="flex flex-row">
              <TableRelationshipsRow />
              <TableRelationshipsRow />
            </div>
            <div className="flex flex-row">
              <TableRelationshipsRow />
              <TableRelationshipsRow />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableSettings;
