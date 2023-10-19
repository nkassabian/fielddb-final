import { Node } from "reactflow";

export interface NewerNode<T = any> extends Node {
  data: T;
}

export default [
  {
    id: "students",
    type: "ERDTableNode",
    data: {
      label: "Students",
      tablename: "Students",
      color: "#2ecc71",
      columns: [
        {
          id: 1,
          key: true,
          name: "id",
          type: "int",
        },
        {
          id: 2,
          key: false,
          name: "name",
          type: "varchar(255)",
        },
      ],
    },
    position: {
      x: 0,
      y: 0,
    },
  },
] as NewerNode[];
