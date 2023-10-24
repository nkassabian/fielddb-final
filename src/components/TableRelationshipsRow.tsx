import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RFStore } from "@/zustand/store";
import { useEffect, useMemo, useState } from "react";

//[ ] When table has been added, the name isnt reflecting.
const TableRelationshipsRow = () => {
  const getTableNames = RFStore((s) => s.getAllTableNames);

  const nodes = RFStore((s) => s.nodes);

  const [tableNames, setTableNames] = useState(getTableNames);

  useEffect(() => {
    setTableNames(getTableNames());
  }, [nodes]);

  const dataTypesList = useMemo(() => {
    return tableNames.map((value) => (
      <SelectItem key={value} value={value}>
        {value}
      </SelectItem>
    ));
  }, [tableNames]);
  return (
    <div className="flex gap-1 my-3 items-center">
      <Select>
        <SelectTrigger className="h-auto">
          <SelectValue placeholder="datatype" />
        </SelectTrigger>
        <SelectContent className="h-52">
          <SelectGroup>{dataTypesList}</SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TableRelationshipsRow;
