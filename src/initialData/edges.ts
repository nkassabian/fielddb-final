import { Edge, MarkerType } from "reactflow";

export default [
  {
    id: "1-2",
    source: "students",
    target: "teachers",
    sourceHandle: "c",
    targetHandle: "a",
    type: "floating",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
] as Edge[];
