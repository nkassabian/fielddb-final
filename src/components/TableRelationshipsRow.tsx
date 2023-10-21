import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RFStore } from "@/zustand/store";
import { useMemo } from "react";

const TableRelationshipsRow = () => {
  const getTableNames = RFStore((s) => s.getAllTableNames);

  var names = getTableNames();

  const dataTypesList = useMemo(() => {
    return names.map((value) => (
      <SelectItem key={value} value={value}>
        {value}
      </SelectItem>
    ));
  }, []);
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
