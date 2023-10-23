// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { RFStore } from "@/zustand/store";
// import { useEffect, useMemo, useState } from "react";

// //[ ] When table has been added, the name isnt reflecting.
// const TableRelationshipsRow = () => {
//   const getTableNames = RFStore((s) => s.getAllTableNames);
//   const onNodesChange = RFStore((s) => s.onNodesChange);

//   const [tableNames, setTableNames] = useState(getTableNames);

//   useEffect(() => {
//     setTableNames(getTableNames());
//     console.log("Insides");
//   }, [onNodesChange]);

//   const dataTypesList = useMemo(() => {
//     return tableNames.map((value) => (
//       <SelectItem key={value} value={value}>
//         {value}
//       </SelectItem>
//     ));
//   }, []);
//   return (
//     <div className="flex gap-1 my-3 items-center">
//       <Select>
//         <SelectTrigger className="h-auto">
//           <SelectValue placeholder="datatype" />
//         </SelectTrigger>
//         <SelectContent className="h-52">
//           <SelectGroup>{dataTypesList}</SelectGroup>
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };

// export default TableRelationshipsRow;
