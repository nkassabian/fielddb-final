import { cn } from "@/lib/utils";
import TableSettingsRow from "./TableSettingsRow";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { Label } from "./ui/label";
import { Toggle } from "./ui/toggle";
import { KeyRound, Trash2 } from "lucide-react";

const TableSettings = ({ drawerOpened }: { drawerOpened: boolean }) => {
  return (
    <div className="m-5 p-5 border border-zinc-200 bg-white rounded-md">
      <div className="flex gap-5  items-end">
        <div className="w-8 h-8 bg-red-500 rounded-md hover:cursor-pointer"></div>
        <div className="flex flex-col gap-2">
          <Input className="w-full h-8" type="text" />
        </div>
      </div>

      <div className="border-t my-3 border-zinc-200"></div>
      <TableSettingsRow />
      <TableSettingsRow />
      <TableSettingsRow />
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
