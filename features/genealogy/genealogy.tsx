// components/InfiniteCanvas.tsx
import React, { useRef, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDecay,
  SharedValue,
} from 'react-native-reanimated';
import Svg, { 
  Line, 
  Polygon, 
  Rect, 
  Circle, 
  Defs, 
  Marker, 
} from 'react-native-svg';

import { CanvasStyles, Connection, Point, Shape, ToolType } from '@/shared/types/canvas';
import { GenealogyToolbar } from './genealogy-toolbar';

// Константы холста
const CANVAS_STYLES: CanvasStyles = {
  canvasSize: 10000,
  gridSize: 50,
  minScale: 0.3,
  maxScale: 3,
};

export const Genealogy: React.FC = () => {
  // Состояния для панорамирования
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);
  const lastTranslateX = useSharedValue<number>(0);
  const lastTranslateY = useSharedValue<number>(0);
  const scale = useSharedValue<number>(1);
  const lastScale = useSharedValue<number>(1);
  
  // Состояния для рисования
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [currentTool, setCurrentTool] = useState<ToolType>('pan');
  const [isDrawingConnection, setIsDrawingConnection] = useState<boolean>(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const isDrawingShape = useRef<boolean>(false);
  const currentShape = useRef<Shape | null>(null);
  const [tempConnection, setTempConnection] = useState<Point | null>(null);
  
  // Преобразование экранных координат в координаты холста
  const screenToCanvasCoords = (screenX: number, screenY: number): Point => {
    return {
      x: (screenX - translateX.value) / scale.value,
      y: (screenY - translateY.value) / scale.value,
    };
  };

  // Создание фигуры
  const createShape = (tool: ToolType, x: number, y: number): Shape => {
    return {
      id: Date.now().toString(),
      type: tool as Shape['type'],
      x,
      y,
      width: 0,
      height: 0,
      rotation: 0,
      color: '#4A90E2',
    };
  };

  // Поиск фигуры по координатам
  const findShapeAtPoint = (x: number, y: number): Shape | undefined => {
    return shapes.find(shape => {
      const bounds = getShapeBounds(shape);
      return x >= bounds.x && 
             x <= bounds.x + bounds.width &&
             y >= bounds.y && 
             y <= bounds.y + bounds.height;
    });
  };

  // Получение границ фигуры
  const getShapeBounds = (shape: Shape): { x: number; y: number; width: number; height: number } => {
    return {
      x: Math.min(shape.x, shape.x + shape.width),
      y: Math.min(shape.y, shape.y + shape.height),
      width: Math.abs(shape.width),
      height: Math.abs(shape.height),
    };
  };

  // Получение центра фигуры
  const getShapeCenter = (shape: Shape): Point => {
    return {
      x: shape.x + shape.width / 2,
      y: shape.y + shape.height / 2,
    };
  };

  // Жест панорамирования
  const panGesture = Gesture.Pan()
    .onStart(() => {
      lastTranslateX.value = translateX.value;
      lastTranslateY.value = translateY.value;
    })
    .onUpdate((e) => {
      if (currentTool === 'pan') {
        translateX.value = lastTranslateX.value + e.translationX;
        translateY.value = lastTranslateY.value + e.translationY;
        
        const maxX = CANVAS_STYLES.canvasSize - Dimensions.get('window').width / scale.value;
        const maxY = CANVAS_STYLES.canvasSize - Dimensions.get('window').height / scale.value;
        
        translateX.value = Math.max(
          -CANVAS_STYLES.canvasSize / 2, 
          Math.min(maxX, translateX.value)
        );
        translateY.value = Math.max(
          -CANVAS_STYLES.canvasSize / 2, 
          Math.min(maxY, translateY.value)
        );
      }
    })
    .onEnd((e) => {
      if (currentTool === 'pan') {
        translateX.value = withDecay({ velocity: e.velocityX });
        translateY.value = withDecay({ velocity: e.velocityY });
      }
    });

  // Жест масштабирования
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      lastScale.value = scale.value;
    })
    .onUpdate((e) => {
      scale.value = Math.max(
        CANVAS_STYLES.minScale, 
        Math.min(CANVAS_STYLES.maxScale, lastScale.value * e.scale)
      );
    });

  // Жест рисования
  const drawGesture = Gesture.Pan()
    .onStart((e) => {
      if (currentTool === 'pan') return;
      
      const canvasCoords = screenToCanvasCoords(e.x, e.y);
      
      if (currentTool === 'connection') {
        const nearShape = findShapeAtPoint(canvasCoords.x, canvasCoords.y);
        if (nearShape) {
          setConnectionStart(nearShape.id);
          setIsDrawingConnection(true);
          setTempConnection(getShapeCenter(nearShape));
        }
      } else {
        const newShape = createShape(currentTool, canvasCoords.x, canvasCoords.y);
        isDrawingShape.current = true;
        currentShape.current = newShape;
        setShapes(prev => [...prev, newShape]);
      }
    })
    .onUpdate((e) => {
      const canvasCoords = screenToCanvasCoords(e.x, e.y);
      
      if (currentTool === 'connection' && isDrawingConnection) {
        setTempConnection(canvasCoords);
      } else if (isDrawingShape.current && currentShape.current) {
        setShapes(prev => prev.map(shape => 
          shape.id === currentShape.current?.id
            ? {
                ...shape,
                width: canvasCoords.x - shape.x,
                height: canvasCoords.y - shape.y,
              }
            : shape
        ));
      }
    })
    .onEnd((e) => {
      const canvasCoords = screenToCanvasCoords(e.x, e.y);
      
      if (currentTool === 'connection' && isDrawingConnection && connectionStart) {
        const nearShape = findShapeAtPoint(canvasCoords.x, canvasCoords.y);
        if (nearShape && nearShape.id !== connectionStart) {
          setConnections(prev => [...prev, {
            id: Date.now().toString(),
            from: connectionStart,
            to: nearShape.id,
          }]);
        }
        setIsDrawingConnection(false);
        setConnectionStart(null);
        setTempConnection(null);
      }
      
      isDrawingShape.current = false;
      currentShape.current = null;
    });

  // Композиция жестов
  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture, drawGesture);

  // Анимированные стили для холста
  const canvasAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  // Рендер SVG фигур
  const renderShape = (shape: Shape): React.ReactElement | null => {
    const center = getShapeCenter(shape);
    
    switch (shape.type) {
      case 'triangle':
        return (
          <Polygon
            key={shape.id}
            points={`${center.x},${shape.y} ${shape.x + shape.width},${shape.y + shape.height} ${shape.x},${shape.y + shape.height}`}
            fill="rgba(74, 144, 226, 0.2)"
            stroke={shape.color}
            strokeWidth={2}
          />
        );
      
      case 'rectangle':
        return (
          <Rect
            key={shape.id}
            x={Math.min(shape.x, shape.x + shape.width)}
            y={Math.min(shape.y, shape.y + shape.height)}
            width={Math.abs(shape.width)}
            height={Math.abs(shape.height)}
            fill="rgba(74, 144, 226, 0.2)"
            stroke={shape.color}
            strokeWidth={2}
            rx={4}
          />
        );
      
      case 'circle':
        return (
          <Circle
            key={shape.id}
            cx={shape.x + shape.width / 2}
            cy={shape.y + shape.height / 2}
            r={Math.abs(shape.width) / 2}
            fill="rgba(74, 144, 226, 0.2)"
            stroke={shape.color}
            strokeWidth={2}
          />
        );
      
      case 'arrow':
        const arrowHeadSize = 10;
        const angle = Math.atan2(shape.height, shape.width);
        const length = Math.sqrt(shape.width ** 2 + shape.height ** 2);
        
        return (
          <>
            <Line
              key={`${shape.id}-line`}
              x1={shape.x}
              y1={shape.y}
              x2={shape.x + shape.width}
              y2={shape.y + shape.height}
              stroke={shape.color}
              strokeWidth={2}
            />
            <Polygon
              key={`${shape.id}-head`}
              points={`
                ${shape.x + shape.width},${shape.y + shape.height}
                ${shape.x + shape.width - arrowHeadSize * Math.cos(angle - Math.PI / 6)},${shape.y + shape.height - arrowHeadSize * Math.sin(angle - Math.PI / 6)}
                ${shape.x + shape.width - arrowHeadSize * Math.cos(angle + Math.PI / 6)},${shape.y + shape.height - arrowHeadSize * Math.sin(angle + Math.PI / 6)}
              `}
              fill={shape.color}
            />
          </>
        );
      
      default:
        return null;
    }
  };

  // Рендер соединений
  const renderConnection = (connection: Connection): React.ReactElement | null => {
    const fromShape = shapes.find(s => s.id === connection.from);
    const toShape = shapes.find(s => s.id === connection.to);
    
    if (!fromShape || !toShape) return null;
    
    const fromCenter = getShapeCenter(fromShape);
    const toCenter = getShapeCenter(toShape);
    
    return (
      <Line
        key={connection.id}
        x1={fromCenter.x}
        y1={fromCenter.y}
        x2={toCenter.x}
        y2={toCenter.y}
        stroke="#333"
        strokeWidth={2}
        markerEnd="url(#arrowhead)"
      />
    );
  };

  // Рендер временного соединения при рисовании
  const renderTempConnection = (): React.ReactElement | null => {
    if (!isDrawingConnection || !connectionStart || !tempConnection) return null;
    
    const fromShape = shapes.find(s => s.id === connectionStart);
    if (!fromShape) return null;
    
    const fromCenter = getShapeCenter(fromShape);
    
    return (
      <Line
        x1={fromCenter.x}
        y1={fromCenter.y}
        x2={tempConnection.x}
        y2={tempConnection.y}
        stroke="#333"
        strokeWidth={2}
        strokeDasharray="5,5"
        opacity={0.5}
      />
    );
  };

  return (
    <View style={styles.container}>
      <GenealogyToolbar
        currentTool={currentTool}
        onToolChange={setCurrentTool}
      />
      
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.canvasContainer, canvasAnimatedStyle]}>
          <Svg 
            width={CANVAS_STYLES.canvasSize} 
            height={CANVAS_STYLES.canvasSize} 
            viewBox={`0 0 ${CANVAS_STYLES.canvasSize} ${CANVAS_STYLES.canvasSize}`}
          >
            {/* Определения маркеров для стрелок */}
            <Defs>
              <Marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="10"
                refY="3.5"
                orient="auto"
              >
                <Polygon points="0 0, 10 3.5, 0 7" fill="#333" />
              </Marker>
            </Defs>
                  
            {/* Соединения */}
            {connections.map(connection => renderConnection(connection))}
            
            {/* Временное соединение */}
            {renderTempConnection()}
            
            {/* Фигуры */}
            {shapes.map(shape => renderShape(shape))}
          </Svg>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvasContainer: {
    position: 'absolute',
    width: CANVAS_STYLES.canvasSize,
    height: CANVAS_STYLES.canvasSize,
  },
});