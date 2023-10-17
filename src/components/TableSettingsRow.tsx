import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Toggle } from "./ui/toggle";
import { KeyRound } from "lucide-react";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "./ui/tooltip";
import { useMemo } from "react";

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

const TableSettingsRow = () => {
  const dataTypesList = useMemo(() => {
    return dataTypes.map((value) => (
      <SelectItem key={value} value={value}>
        {value}
      </SelectItem>
    ));
  }, []); // Use an empty dependency array to memoize it once

  return (
    <div className="flex gap-1 items-end my-3">
      <Input className="w-full h-8 " type="text" />
      <Select>
        <SelectTrigger className="h-8">
          <SelectValue placeholder="datatype" />
        </SelectTrigger>
        <SelectContent className="h-52">
          {/* <SelectGroup>{dataTypesList}</SelectGroup> */}
        </SelectContent>
      </Select>
      <Toggle className="h-8 w-8">N</Toggle>
      <Toggle aria-label="Toggle italic" className="h-8 w-8 p-2">
        <KeyRound />
      </Toggle>
    </div>
  );
};

export default TableSettingsRow;
