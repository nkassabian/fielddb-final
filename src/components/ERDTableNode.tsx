import React from "react";
import { KeyRound } from "lucide-react";
import { Handle, Position } from "reactflow";

const ERDTableNode = ({ data }: any) => {
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            className="text-x text-center text-white text-md"
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
                nullable: boolean;
                name: string | undefined;
                key: boolean | undefined;
                type: string | undefined;
              }) => (
                <tr
                  key={col.name}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th className="h-4 w-4 pl-2">
                    {col.key && <KeyRound className="h-3 w-3" />}
                  </th>
                  <td
                    scope="row"
                    className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                  >
                    {col.name}
                  </td>
                  <td className="px-3 py-2">
                    {col.type} {col.nullable == true ? <sup>🅽</sup> : <></>}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <Handle type="source" position={Position.Top} id="a" />
        <Handle type="source" position={Position.Right} id="b" />
        <Handle type="source" position={Position.Bottom} id="c" />
        <Handle type="source" position={Position.Left} id="d" />
      </div>
    </>
  );
};

export default ERDTableNode;
