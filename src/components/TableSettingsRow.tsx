import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RFStore } from "@/zustand/store";
import { KeyRound, MoreVertical, MoveVertical, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { Toggle } from "./ui/toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

const dataTypes = [
  "int", // Default: 0
  "bigint", // Default: 0
  "smallint", // Default: 0
  "tinyint", // Default: 0
  "numeric(18,2)", // Default: Custom value for precision and scale
  "decimal(18,2)", // Default: Custom value for precision and scale
  "float(53)", // Default: 0.0
  "real", // Default: 0.0
  "char(1)", // Default: ""
  "varchar(255)", // Default: ""
  "text", // Default: ""
  "binary(1)", // Default: Custom value for length
  "varbinary(1)", // Default: Custom value for length
  "image", // Default: Custom binary data
  "date", // Default: "0000-00-00"
  "time", // Default: "00:00:00"
  "datetime", // Default: "0000-00-00 00:00:00"
  "smalldatetime", // Default: "0000-00-00 00:00:00"
  "bit", // Default: false
  "uniqueidentifier", // Default: Custom unique identifier
  "xml", // Default: "<xml_data>"
  "sql_variant", // Default: "sql_variant_data"
  "timestamp", // Default: Custom binary data
  "geography", // Default: "geography_data"
  "geometry", // Default: "geometry_data"
  "hierarchyid", // Default: "hierarchyid_data"
  "money", // Default: 0.00
];

const TableSettingsRow = ({
  drawerOpened,
  colName,
  dataType,
  tableId,
  colId,
  nullable,
  isPrimary,
}: {
  drawerOpened: boolean;
  colName: string;
  colId: number;
  tableId: string;
  dataType: string;
  nullable: boolean;
  isPrimary: boolean;
}) => {
  const updateNodeProperty = RFStore((s) => s.updateNodeProperty);
  const onNodeChange = RFStore((s) => s.onNodesChange);
  const removeColumnFromNode = RFStore((s) => s.removeColumnFromNode);

  const [rowName, setRowName] = useState(colName);
  const [rowType, setRowType] = useState(dataType);
  const [isnullable, setIsNullable] = useState(nullable);

  const memoizedDataTypes = useMemo(() => dataTypes, []);

  useEffect(() => {
    if (drawerOpened === true) {
      setRowType(dataType);
      setIsNullable(nullable);
    }
  }, [drawerOpened, onNodeChange]);

  const dataTypesList = useMemo(() => {
    return memoizedDataTypes.map((value) => (
      <SelectItem key={value} value={value}>
        {value}
      </SelectItem>
    ));
  }, []); // Use an empty dependency array to memoize it once

  return (
    <div className="flex gap-1 my-3 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{rowName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              removeColumnFromNode(tableId, colId);
            }}
            className="flex gap-2 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        className="w-full h-6 p-1"
        value={rowName}
        onChange={(event) => {
          setRowName(event.target.value);
          console.log(event.target.value);
          updateNodeProperty(tableId, colId, "name", event.target.value);
        }}
        type="text"
      />
      <Select
        onValueChange={(value) => {
          setRowType(value);
          updateNodeProperty(tableId, colId, "type", value);
        }}
        value={rowType}
      >
        <SelectTrigger className="h-6 p-1 text-xs">
          <SelectValue placeholder="datatype" />
        </SelectTrigger>
        <SelectContent className="h-52">
          <SelectGroup>{dataTypesList}</SelectGroup>
        </SelectContent>
      </Select>
      <Toggle
        pressed={isnullable}
        onPressedChange={(value) => {
          setIsNullable(value);
          updateNodeProperty(tableId, colId, "nullable", value);
        }}
        disabled={isPrimary}
        className="h-6 w-6"
      >
        N
      </Toggle>
      <Toggle
        pressed={isPrimary}
        aria-label="Toggle italic"
        className="h-6 w-6 p-1"
      >
        <KeyRound />
      </Toggle>
    </div>
  );
};

export default TableSettingsRow;
