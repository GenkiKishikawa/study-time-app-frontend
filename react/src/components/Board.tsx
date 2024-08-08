import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import ReactFlow,
{
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
  type Node,
  type Edge,
  type OnConnect,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "horizontal-1",
    sourcePosition: Position.Right,
    type: "input",
    data: { label: "React" },
    style: { background: "#00ffff" },
    position: { x: 0, y: 80 },
  },
  {
    id: "horizontal-2",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: "TypeScript" },
    position: { x: 250, y: 0 },
  },
  {
    id: "horizontal-3",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: "Hooks" },
    position: { x: 250, y: 160 },
  },
  {
    id: "horizontal-4",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: "devise" },
    position: { x: 500, y: 0 },
  },
  {
    id: "horizontal-5",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: "useState" },
    position: { x: 500, y: 195 },
  },
  {
    id: "horizontal-6",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: "useEffect" },
    position: { x: 500, y: 125 },
  },
  {
    id: "horizontal-7",
    sourcePosition: Position.Right,
    type: "input",
    data: { label: "英語" },
    style: { background: "#ff7f50" },
    position: { x: 0, y: 335 },
  },
  {
    id: "horizontal-8",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: "単語" },
    position: { x: 250, y: 300 },
  },
  {
    id: "horizontal-9",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: "文法" },
    position: { x: 250, y: 370 },
  },
];

const initialEdges: Edge[] = [
  {
    id: "horizontal-e1-2",
    source: "horizontal-1",
    type: "smoothstep",
    target: "horizontal-2",
    animated: true,
  },
  {
    id: "horizontal-e1-3",
    source: "horizontal-1",
    type: "smoothstep",
    target: "horizontal-3",
    animated: true,
  },
  {
    id: "horizontal-e1-4",
    source: "horizontal-2",
    type: "smoothstep",
    target: "horizontal-4",
    label: "edge label",
  },
  {
    id: "horizontal-e3-5",
    source: "horizontal-3",
    type: "smoothstep",
    target: "horizontal-5",
    animated: true,
  },
  {
    id: "horizontal-e3-6",
    source: "horizontal-3",
    type: "smoothstep",
    target: "horizontal-6",
    animated: true,
  },
  {
    id: "horizontal-e4-7",
    source: "horizontal-7",
    type: "smoothstep",
    target: "horizontal-8",
    animated: true,
  },
  {
    id: "horizontal-e4-8",
    source: "horizontal-7",
    type: "smoothstep",
    target: "horizontal-9",
    animated: true,
  },
];

const Board: React.FC = () => {
  const [nodes, , onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const onConnect: OnConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), [setEdges]);

  return (
    <Box sx={{
      backgroundColor: "#f5f5f5",
      borderRadius: 8,
      width: "70vw",
      height: "75vh",
      marginTop: 3,
      marginLeft: "auto",
      marginRight: "auto",
    }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </Box >

  );
}

export default Board;