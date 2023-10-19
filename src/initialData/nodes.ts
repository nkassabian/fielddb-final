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
  {
    id: "teachers",
    type: "ERDTableNode",
    data: {
      label: "Teachers",
      tablename: "Teachers",
      color: "#2ecc71",
      columns: [
        {
          id: 1,
          key: true,
          nullable: false,
          name: "id",
          type: "int",
        },
        {
          id: 2,
          key: false,
          nullable: true,
          name: "name",
          type: "varchar(255)",
        },
      ],
    },
    position: {
      x: 0,
      y: 100,
    },
  },
] as NewerNode[];
