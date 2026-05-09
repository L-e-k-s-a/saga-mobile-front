import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  PanResponder,
  GestureResponderEvent,
  LayoutChangeEvent,
  ScrollView,
  Dimensions,
} from 'react-native';
import { GenealogyToolbar, Shape } from './genealogy-toolbar';

// Типы фигур
type FigureType = 'rectangle' | 'circle';

// Интерфейс фигуры
interface Figure {
  id: string;
  type: FigureType;
  x: number;
  y: number;
  width: number;
  height: number;
}

// Интерфейс линии
interface Line {
  id: string;
  fromId: string;
  toId: string;
}

interface GenealogyProps {
  initialFigures?: Figure[];
  initialLines?: Line[];
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Genealogy: React.FC<GenealogyProps> = ({
  initialFigures = [],
  initialLines = [],
}) => {
  const [figures, setFigures] = useState<Figure[]>(initialFigures);
  const [lines, setLines] = useState<Line[]>(initialLines);
  const [selectedShape, setSelectedShape] = useState<Shape>('rectangle');
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedFigureId, setSelectedFigureId] = useState<string | null>(null);
  
  // Для перемещения канваса
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  
  // Для перемещения фигур
  const [draggedFigure, setDraggedFigure] = useState<{ id: string; startX: number; startY: number; offsetX: number; offsetY: number } | null>(null);
  
  const canvasSize = { width: SCREEN_WIDTH * 3, height: SCREEN_HEIGHT * 3 };
  const scrollViewRef = useRef<ScrollView>(null);

  // Генерация уникального ID
  const generateId = () => `${Date.now()}-${Math.random()}`;

  // Обработка нажатия на канвас
  const handleCanvasPress = (event: GestureResponderEvent) => {
    // Получаем координаты относительно канваса
    const { pageX, pageY } = event.nativeEvent;
    const canvasX = pageX - canvasOffset.x;
    const canvasY = pageY - canvasOffset.y;
    
    // Режим удаления
    if (selectedShape === 'trash') {
      const figureToDelete = figures.find(figure => {
        const inX = canvasX >= figure.x && canvasX <= figure.x + figure.width;
        const inY = canvasY >= figure.y && canvasY <= figure.y + figure.height;
        return inX && inY;
      });
      
      if (figureToDelete) {
        setFigures(prev => prev.filter(f => f.id !== figureToDelete.id));
        setLines(prev => prev.filter(line => 
          line.fromId !== figureToDelete.id && line.toId !== figureToDelete.id
        ));
      }
      return true;
    }
    
    // Режим линии (соединения)
    if (selectedShape === 'line') {
      const clickedFigure = figures.find(figure => {
        const inX = canvasX >= figure.x && canvasX <= figure.x + figure.width;
        const inY = canvasY >= figure.y && canvasY <= figure.y + figure.height;
        return inX && inY;
      });
      
      if (clickedFigure) {
        if (!isConnecting) {
          setIsConnecting(true);
          setSelectedFigureId(clickedFigure.id);
        } else {
          if (selectedFigureId && selectedFigureId !== clickedFigure.id) {
            const lineExists = lines.some(
              line => 
                (line.fromId === selectedFigureId && line.toId === clickedFigure.id) ||
                (line.fromId === clickedFigure.id && line.toId === selectedFigureId)
            );
            
            if (!lineExists) {
              const newLine: Line = {
                id: generateId(),
                fromId: selectedFigureId,
                toId: clickedFigure.id,
              };
              setLines(prev => [...prev, newLine]);
            }
          }
          setIsConnecting(false);
          setSelectedFigureId(null);
        }
      }
      return true;
    }
    
    // Режим создания фигур
    if (selectedShape === 'rectangle' || selectedShape === 'circle') {
      const size = selectedShape === 'rectangle' 
        ? { width: 100, height: 80 } 
        : { width: 80, height: 80 };
      
      const newFigure: Figure = {
        id: generateId(),
        type: selectedShape,
        x: canvasX - size.width / 2,
        y: canvasY - size.height / 2,
        ...size,
      };
      
      setFigures(prev => [...prev, newFigure]);
      return true;
    }
    
    return true;
  };

  // PanResponder для перемещения канваса и фигур
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const { pageX, pageY } = e.nativeEvent;
        const canvasX = pageX - canvasOffset.x;
        const canvasY = pageY - canvasOffset.y;
        
        // Проверяем, нажали ли на фигуру в режиме перемещения
        if (selectedShape === 'move') {
          const figure = figures.find(f => {
            const inX = canvasX >= f.x && canvasX <= f.x + f.width;
            const inY = canvasY >= f.y && canvasY <= f.y + f.height;
            return inX && inY;
          });
          
          if (figure) {
            setDraggedFigure({
              id: figure.id,
              startX: figure.x,
              startY: figure.y,
              offsetX: canvasX - figure.x,
              offsetY: canvasY - figure.y,
            });
            return;
          }
        }
        
        // Иначе перемещаем канвас
        setIsDraggingCanvas(true);
        dragStartRef.current = { x: pageX - canvasOffset.x, y: pageY - canvasOffset.y };
      },
      onPanResponderMove: (e) => {
        const { pageX, pageY } = e.nativeEvent;
        
        // Перемещение фигуры
        if (draggedFigure) {
          const newX = pageX - canvasOffset.x - draggedFigure.offsetX;
          const newY = pageY - canvasOffset.y - draggedFigure.offsetY;
          
          setFigures(prev => prev.map(figure =>
            figure.id === draggedFigure.id
              ? { ...figure, x: newX, y: newY }
              : figure
          ));
          return;
        }
        
        // Перемещение канваса
        if (isDraggingCanvas) {
          const newOffsetX = pageX - dragStartRef.current.x;
          const newOffsetY = pageY - dragStartRef.current.y;
          
          setCanvasOffset({
            x: Math.min(0, Math.max(-(canvasSize.width - SCREEN_WIDTH), newOffsetX)),
            y: Math.min(0, Math.max(-(canvasSize.height - SCREEN_HEIGHT), newOffsetY)),
          });
        }
      },
      onPanResponderRelease: () => {
        setIsDraggingCanvas(false);
        setDraggedFigure(null);
      },
    })
  ).current;

  // Отмена режима соединения
  const handleCancelConnection = () => {
    setIsConnecting(false);
    setSelectedFigureId(null);
  };

  // Отрисовка линий
  const renderLines = () => {
    return lines.map(line => {
      const fromFigure = figures.find(f => f.id === line.fromId);
      const toFigure = figures.find(f => f.id === line.toId);
      
      if (!fromFigure || !toFigure) return null;
      
      const fromX = fromFigure.x + fromFigure.width / 2;
      const fromY = fromFigure.y + fromFigure.height / 2;
      const toX = toFigure.x + toFigure.width / 2;
      const toY = toFigure.y + toFigure.height / 2;
      
      const angle = Math.atan2(toY - fromY, toX - fromX);
      const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
      
      return (
        <View
          key={line.id}
          style={{
            position: 'absolute',
            left: fromX,
            top: fromY,
            width: length,
            height: 3,
            backgroundColor: '#2196F3',
            transform: [{ rotate: `${angle}rad` }],
            transformOrigin: 'left center',
          }}
        />
      );
    });
  };

  // Отрисовка фигур
  const renderFigures = () => {
    return figures.map(figure => (
      <TouchableOpacity
        key={figure.id}
        style={{
          position: 'absolute',
          left: figure.x,
          top: figure.y,
          width: figure.width,
          height: figure.height,
          backgroundColor: selectedFigureId === figure.id && isConnecting ? '#E3F2FD' : '#4CAF50',
          borderRadius: figure.type === 'circle' ? figure.width / 2 : 8,
          borderWidth: 2,
          borderColor: selectedFigureId === figure.id && isConnecting ? '#2196F3' : '#388E3C',
        }}
        activeOpacity={1}
        onPress={() => {
          if (selectedShape === 'trash') {
            setFigures(prev => prev.filter(f => f.id !== figure.id));
            setLines(prev => prev.filter(line => 
              line.fromId !== figure.id && line.toId !== figure.id
            ));
          } else if (selectedShape === 'line') {
            if (!isConnecting) {
              setIsConnecting(true);
              setSelectedFigureId(figure.id);
            } else if (selectedFigureId && selectedFigureId !== figure.id) {
              const lineExists = lines.some(
                line => 
                  (line.fromId === selectedFigureId && line.toId === figure.id) ||
                  (line.fromId === figure.id && line.toId === selectedFigureId)
              );
              
              if (!lineExists) {
                setLines(prev => [...prev, {
                  id: generateId(),
                  fromId: selectedFigureId,
                  toId: figure.id,
                }]);
              }
              setIsConnecting(false);
              setSelectedFigureId(null);
            } else if (selectedFigureId === figure.id) {
              setIsConnecting(false);
              setSelectedFigureId(null);
            }
          }
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ 
            width: 30, 
            height: 30, 
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: figure.type === 'circle' ? 15 : 4,
          }} />
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <ScrollView
        ref={scrollViewRef}
        scrollEnabled={false}
        contentContainerStyle={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
            backgroundColor: '#ffffff',
            position: 'relative',
            transform: [{ translateX: canvasOffset.x }, { translateY: canvasOffset.y }],
          }}
          onPress={handleCanvasPress}
          {...panResponder.panHandlers}
        >
          {renderLines()}
          {renderFigures()}
        </TouchableOpacity>
      </ScrollView>
      
      <GenealogyToolbar
        selectedShape={selectedShape}
        setSelectedShape={(shape) => {
          setSelectedShape(shape);
          if (shape !== 'line') {
            setIsConnecting(false);
            setSelectedFigureId(null);
          }
        }}
        isConnecting={isConnecting}
        onCancelConnection={handleCancelConnection}
      />
    </View>
  );
};