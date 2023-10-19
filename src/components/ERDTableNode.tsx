import React from "react";
import { Key, KeyRound } from "lucide-react";
import { Handle, NodeProps, Position } from "reactflow";
import { RFStore } from "@/zustand/store";

const ERDTableNode = ({ data }: any) => {
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            className="text-x text-center text-white text-lg"
            style={{ backgroundColor: data.color }}
          >
            <tr>
              <th className="py-1" colSpan={5}>
                {data.label}
              </th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {data.columns.map(
              (col: {
                name: string | undefined;
                key: boolean | undefined;
                type: string | undefined;
              }) => (
                <tr
                  key={col.name}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th className="h-4 w-4 pl-2">
                    {col.key && <KeyRound className="h-4 w-4" />}
                  </th>
                  <td
                    scope="row"
                    className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                  >
                    {col.name}
                  </td>
                  <td className="px-3 py-2"> {col.type}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ERDTableNode;
