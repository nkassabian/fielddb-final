import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RFStore, TableCreationStore } from "@/zustand/store";
import { useState } from "react";

const NewTablePopUp = () => {
  const [creationTableName, setCreationTableName] = useState("");
  const { isTablePopupShown, setIsTablePopupShown } = TableCreationStore(
    (state) => state
  );
  const appendTableNode = RFStore((state) => state.appendTableNode);

  return (
    <Dialog open={isTablePopupShown} onOpenChange={setIsTablePopupShown}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Table</DialogTitle>
          <DialogDescription>
            Please input a name for the new table.
          </DialogDescription>
        </DialogHeader>
        <Input
          value={creationTableName}
          onChange={(event) => {
            setCreationTableName(event.target.value);
          }}
        ></Input>
        <DialogFooter>
          <Button
            onClick={() => {
              setIsTablePopupShown(false);
            }}
            variant={"ghost"}
          >
            Cancel
          </Button>
          <Button
            disabled={!creationTableName}
            onClick={() => {
              appendTableNode(creationTableName);
              setIsTablePopupShown(false);
              setCreationTableName("");
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewTablePopUp;
