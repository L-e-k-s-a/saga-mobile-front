export type Point = {
  x: number;
  y: number;
}

export type Shape = {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color: string;
  label?: string;
}

export type Connection = {
  id: string;
  from: string;
  to: string;
}

export type CanvasState = {
  shapes: Shape[];
  connections: Connection[];
}

export type ShapeType = 'triangle' | 'arrow' | 'rectangle' | 'circle';

export type ToolType = 'pan' | ShapeType | 'connection';

export type Tool = {
  id: ToolType;
  label: string;
  name: string;
}

export type CanvasStyles = {
  canvasSize: number;
  gridSize: number;
  minScale: number;
  maxScale: number;
}