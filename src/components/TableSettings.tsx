import { cn } from "@/lib/utils";
import TableSettingsRow from "./TableSettingsRow";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { Check, Trash2 } from "lucide-react";
import { NewerNode } from "@/initialData/nodes";
import { RFStore } from "@/zustand/store";
import { useEffect, useState } from "react";

const TableSettings = ({
  drawerOpened,
  selectedNode,
}: {
  drawerOpened: boolean;
  selectedNode: NewerNode | null;
}) => {
  const updateTableName = RFStore((s) => s.updateTableNode);
  const updateNodeColor = RFStore((s) => s.updateNodeColor);

  const [tableName, setTableName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ff0000");

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
    <div className="m-5 p-5 border border-zinc-200 bg-white rounded-md">
      <div className="flex gap-5  items-end">
        <div className="flex flex-row gap-2">
          {/*  */}

          <div className="relative inline-block ">
            <button
              className="w-8 h-8 rounded-xl cursor-pointer"
              style={{ backgroundColor: selectedNode?.data.color }}
              onClick={toggleDropdown}
            ></button>
            {drawerOpened && isOpen && (
              <div className="absolute -top-10 right-12 mt-10 w-32 p-1 rounded-xl bg-zinc-50 shadow-xl">
                <div className="flex flex-wrap">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-xl cursor-pointer m-1 flex items-center justify-center text-zinc-50"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setSelectedColor(color);
                        if (selectedNode != null) {
                          updateNodeColor(selectedNode?.id, color.toString());
                        }
                      }}
                    >
                      {selectedNode?.data.color === color ? <Check /> : <></>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/*  */}
          <Input
            className="w-full h-8"
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
        <Button variant={"destructive"} className="flex flex-row gap-2">
          <Trash2 className="h-4 w-4" />
          Delete Table
        </Button>
        <Button variant={"ghost"}>Add Column</Button>
      </div>
    </div>
  );
};

export default TableSettings;
