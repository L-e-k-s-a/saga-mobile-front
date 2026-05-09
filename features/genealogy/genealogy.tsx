import React, { useState, useRef } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { GenealogyToolbar, Shape } from './genealogy-toolbar';

// Типы фигур
type FigureType = 'rectangle' | 'circle';

interface Figure {
  id: string;
  type: FigureType;
  x: number;
  y: number;
  width: number;
  height: number;
}

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
  const canvasOffsetX = useSharedValue(0);
  const canvasOffsetY = useSharedValue(0);
  const startOffsetX = useSharedValue(0);
  const startOffsetY = useSharedValue(0);
  
  // Для перемещения фигур
  const [selectedFigureForMove, setSelectedFigureForMove] = useState<string | null>(null);
  const figureStartPosition = useRef({ x: 0, y: 0 });
  const panStartPosition = useRef({ x: 0, y: 0 });
  
  const canvasSize = { width: SCREEN_WIDTH * 3, height: SCREEN_HEIGHT * 3 };
  
  // Минимальные и максимальные отступы
  const minOffsetX = -(canvasSize.width - SCREEN_WIDTH);
  const minOffsetY = -(canvasSize.height - SCREEN_HEIGHT);
  const maxOffsetX = 0;
  const maxOffsetY = 0;

  // Refs для жестов
  const tapRef = useRef(null);
  const panRef = useRef(null);

  // Генерация ID
  const generateId = () => `${Date.now()}-${Math.random()}`;

  // Получение координат относительно канваса
  const getCanvasCoordinates = (x: number, y: number) => {
    return {
      x: x - canvasOffsetX.value,
      y: y - canvasOffsetY.value,
    };
  };

  // Поиск фигуры
  const findFigureAtPosition = (x: number, y: number) => {
    return figures.find(figure => {
      const inX = x >= figure.x && x <= figure.x + figure.width;
      const inY = y >= figure.y && y <= figure.y + figure.height;
      return inX && inY;
    });
  };

  // Обработка начала жеста панорамирования
  const onPanGestureEvent = (event: any) => {
    const { translationX, translationY, state } = event.nativeEvent;
    
    if (state === State.ACTIVE) {
      if (selectedFigureForMove) {
        // Перемещаем выбранную фигуру
        const newX = figureStartPosition.current.x + translationX;
        const newY = figureStartPosition.current.y + translationY;
        
        setFigures(prev => prev.map(figure =>
          figure.id === selectedFigureForMove
            ? { ...figure, x: newX, y: newY }
            : figure
        ));
      } else {
        // Перемещаем канвас
        let newOffsetX = startOffsetX.value + translationX;
        let newOffsetY = startOffsetY.value + translationY;
        
        newOffsetX = Math.min(maxOffsetX, Math.max(minOffsetX, newOffsetX));
        newOffsetY = Math.min(maxOffsetY, Math.max(minOffsetY, newOffsetY));
        
        canvasOffsetX.value = newOffsetX;
        canvasOffsetY.value = newOffsetY;
      }
    }
    
    if (state === State.END || state === State.CANCELLED) {
      // Сбрасываем перемещение фигуры
      if (selectedFigureForMove) {
        runOnJS(setSelectedFigureForMove)(null);
      }
      // Сохраняем текущие отступы для следующего жеста
      startOffsetX.value = canvasOffsetX.value;
      startOffsetY.value = canvasOffsetY.value;
    }
  };

  // Обработка начала панорамирования
  const onPanHandlerStart = (event: any) => {
    const { x, y } = event.nativeEvent;
    const { x: canvasX, y: canvasY } = getCanvasCoordinates(x, y);
    
    // В режиме move проверяем, нажали ли на фигуру
    if (selectedShape === 'move') {
      const figure = findFigureAtPosition(canvasX, canvasY);
      if (figure) {
        setSelectedFigureForMove(figure.id);
        figureStartPosition.current = { x: figure.x, y: figure.y };
        panStartPosition.current = { x: canvasX, y: canvasY };
        return;
      }
    }
    
    // Иначе сохраняем начальную позицию канваса
    startOffsetX.value = canvasOffsetX.value;
    startOffsetY.value = canvasOffsetY.value;
  };

  // Обработка тапа
  const onTapHandler = (event: any) => {
    const { state, x, y } = event.nativeEvent;
    
    if (state !== State.ACTIVE) return;
    
    const { x: canvasX, y: canvasY } = getCanvasCoordinates(x, y);
    
    // Режим удаления
    if (selectedShape === 'trash') {
      const figureToDelete = findFigureAtPosition(canvasX, canvasY);
      if (figureToDelete) {
        setFigures(prev => prev.filter(f => f.id !== figureToDelete.id));
        setLines(prev => prev.filter(line => 
          line.fromId !== figureToDelete.id && line.toId !== figureToDelete.id
        ));
      }
      return;
    }
    
    // Режим линии
    if (selectedShape === 'line') {
      const clickedFigure = findFigureAtPosition(canvasX, canvasY);
      if (clickedFigure) {
        if (!isConnecting) {
          setIsConnecting(true);
          setSelectedFigureId(clickedFigure.id);
        } else if (selectedFigureId && selectedFigureId !== clickedFigure.id) {
          const lineExists = lines.some(
            line => 
              (line.fromId === selectedFigureId && line.toId === clickedFigure.id) ||
              (line.fromId === clickedFigure.id && line.toId === selectedFigureId)
          );
          
          if (!lineExists) {
            setLines(prev => [...prev, {
              id: generateId(),
              fromId: selectedFigureId,
              toId: clickedFigure.id,
            }]);
          }
          setIsConnecting(false);
          setSelectedFigureId(null);
        } else if (selectedFigureId === clickedFigure.id) {
          setIsConnecting(false);
          setSelectedFigureId(null);
        }
      }
      return;
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
    }
  };

  // Анимированный стиль для канваса
  const animatedCanvasStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: canvasOffsetX.value },
      { translateY: canvasOffsetY.value },
    ],
  }));

  // Отрисовка линий - теперь правильно привязана к координатам фигур
  const renderLines = () => {
    return lines.map(line => {
      const fromFigure = figures.find(f => f.id === line.fromId);
      const toFigure = figures.find(f => f.id === line.toId);
      
      if (!fromFigure || !toFigure) return null;
      
      // Вычисляем центр фигур
      const fromCenterX = fromFigure.x + fromFigure.width / 2;
      const fromCenterY = fromFigure.y + fromFigure.height / 2;
      const toCenterX = toFigure.x + toFigure.width / 2;
      const toCenterY = toFigure.y + toFigure.height / 2;
      
      // Вычисляем угол и длину линии
      const dx = toCenterX - fromCenterX;
      const dy = toCenterY - fromCenterY;
      const angle = Math.atan2(dy, dx);
      const length = Math.sqrt(dx * dx + dy * dy);
      
      return (
        <View
          key={line.id}
          style={{
            position: 'absolute',
            left: fromCenterX,
            top: fromCenterY,
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
          opacity: selectedFigureForMove === figure.id ? 0.7 : 1,
          shadowColor: selectedFigureForMove === figure.id ? '#000' : 'transparent',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: selectedFigureForMove === figure.id ? 5 : 0,
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

  // Временная линия при соединении (показываем от выбранной фигуры до текущей позиции)
  const renderTempLine = () => {
    if (!isConnecting || !selectedFigureId) return null;
    
    const fromFigure = figures.find(f => f.id === selectedFigureId);
    if (!fromFigure) return null;
    
    // Здесь можно было бы добавить временную линию от фигуры до курсора,
    // но для этого нужно отслеживать позицию тапа/перемещения
    return null;
  };

  // Отмена режима соединения
  const handleCancelConnection = () => {
    setIsConnecting(false);
    setSelectedFigureId(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0', overflow: 'hidden' }}>
      <PanGestureHandler
        ref={panRef}
        onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onPanHandlerStart}
        simultaneousHandlers={[tapRef]}
      >
        <Animated.View style={{ flex: 1 }}>
          <TapGestureHandler
            ref={tapRef}
            onHandlerStateChange={onTapHandler}
            numberOfTaps={1}
            simultaneousHandlers={[panRef]}
          >
            <Animated.View
              style={[
                {
                  width: canvasSize.width,
                  height: canvasSize.height,
                  backgroundColor: '#ffffff',
                  position: 'relative',
                },
                animatedCanvasStyle,
              ]}
            >
              {renderLines()}
              {renderTempLine()}
              {renderFigures()}
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
      </PanGestureHandler>
      
      <GenealogyToolbar
        selectedShape={selectedShape}
        setSelectedShape={(shape) => {
          setSelectedShape(shape);
          if (shape !== 'line') {
            setIsConnecting(false);
            setSelectedFigureId(null);
          }
          if (shape !== 'move') {
            setSelectedFigureForMove(null);
          }
        }}
        isConnecting={isConnecting}
        onCancelConnection={handleCancelConnection}
      />
    </View>
  );
};