import React, { useRef, useState } from 'react';
import { Dimensions, LayoutChangeEvent, ScrollView, View } from 'react-native';
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
	State,
	TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, { 
	runOnJS, 
	useSharedValue, 
	useAnimatedStyle 
} from 'react-native-reanimated';
import { GenealogyToolbar, Shape } from './genealogy-toolbar';

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

// Компонент для отрисовки одной фигуры с возможностью перетаскивания
const DraggableFigure: React.FC<{
	figure: Figure;
	isSelected: boolean;
	isConnecting: boolean;
	isMoving: boolean;
	onMoveStart: (id: string) => void;
	onMoveEnd: (id: string, x: number, y: number) => void;
	enabled: boolean;
}> = ({ figure, isSelected, isConnecting, isMoving, onMoveStart, onMoveEnd, enabled }) => {
	// Используем shared values для позиции вместо пропсов
	const posX = useSharedValue(figure.x);
	const posY = useSharedValue(figure.y);
	const startX = useSharedValue(0);
	const startY = useSharedValue(0);
	const startPosX = useSharedValue(0);
	const startPosY = useSharedValue(0);

	// Обновляем позицию при изменении пропсов (если фигуру переместили извне)
	React.useEffect(() => {
		posX.value = figure.x;
		posY.value = figure.y;
	}, [figure.x, figure.y]);

	const panGesture = Gesture.Pan()
		.onStart((event) => {
			'worklet';
			startX.value = event.absoluteX;
			startY.value = event.absoluteY;
			startPosX.value = posX.value;
			startPosY.value = posY.value;
			runOnJS(onMoveStart)(figure.id);
		})
		.onUpdate((event) => {
			'worklet';
			posX.value = startPosX.value + (event.absoluteX - startX.value);
			posY.value = startPosY.value + (event.absoluteY - startY.value);
		})
		.onEnd(() => {
			'worklet';
			// Просто сохраняем финальную позицию без сброса
			runOnJS(onMoveEnd)(figure.id, posX.value, posY.value);
		})
		.enabled(enabled);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			position: 'absolute',
			left: posX.value,
			top: posY.value,
			width: figure.width,
			height: figure.height,
			backgroundColor: isSelected && isConnecting ? '#E3F2FD' : '#4CAF50',
			borderRadius: figure.type === 'circle' ? figure.width / 2 : 8,
			borderWidth: 2,
			borderColor: isSelected && isConnecting ? '#2196F3' : '#388E3C',
			opacity: isMoving ? 0.7 : 1,
		};
	});

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View style={animatedStyle}>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<View
						style={{
							width: 30,
							height: 30,
							backgroundColor: 'rgba(255,255,255,0.3)',
							borderRadius: figure.type === 'circle' ? 15 : 4,
						}}
					/>
				</View>
			</Animated.View>
		</GestureDetector>
	);
};
export const Genealogy: React.FC<GenealogyProps> = ({
	initialFigures = [],
	initialLines = [],
}) => {
	const [figures, setFigures] = useState<Figure[]>(initialFigures);
	const [lines, setLines] = useState<Line[]>(initialLines);
	const [selectedShape, setSelectedShape] = useState<Shape>('rectangle');
	const [isConnecting, setIsConnecting] = useState(false);
	const [selectedFigureId, setSelectedFigureId] = useState<string | null>(null);
	const [movingFigureId, setMovingFigureId] = useState<string | null>(null);

	const scrollViewRef = useRef<ScrollView>(null);
	const scrollPosition = useRef({ x: 0, y: 0 });
	const canvasLayoutRef = useRef({ x: 0, y: 0 });

	const canvasSize = { width: SCREEN_WIDTH * 3, height: SCREEN_HEIGHT * 3 };

	const tapRef = useRef(null);

	const generateId = () => `${Date.now()}-${Math.random()}`;

	const findFigureAtPosition = (x: number, y: number) => {
		return figures.find((figure) => {
			const inX = x >= figure.x && x <= figure.x + figure.width;
			const inY = y >= figure.y && y <= figure.y + figure.height;
			return inX && inY;
		});
	};

	const createFigureAtPosition = (x: number, y: number) => {
		const size =
			selectedShape === 'rectangle'
				? { width: 100, height: 80 }
				: { width: 80, height: 80 };

		const newFigure: Figure = {
			id: generateId(),
			type: selectedShape as FigureType,
			x: x - size.width / 2,
			y: y - size.height / 2,
			...size,
		};

		setFigures((prev) => [...prev, newFigure]);
	};

	const onCanvasLayout = (event: LayoutChangeEvent) => {
		event.target.measureInWindow((x, y) => {
			canvasLayoutRef.current = { x, y };
		});
	};

	// Обработка тапа
	const onTapHandler = (event: any) => {
		const { state, x, y } = event.nativeEvent;

		if (state !== State.ACTIVE) return;

		const canvasX = x;
		const canvasY = y;

		// Режим удаления
		if (selectedShape === 'trash') {
			const figureToDelete = findFigureAtPosition(canvasX, canvasY);
			if (figureToDelete) {
				setFigures((prev) => prev.filter((f) => f.id !== figureToDelete.id));
				setLines((prev) =>
					prev.filter(
						(line) =>
							line.fromId !== figureToDelete.id &&
							line.toId !== figureToDelete.id,
					),
				);
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
						(line) =>
							(line.fromId === selectedFigureId &&
								line.toId === clickedFigure.id) ||
							(line.fromId === clickedFigure.id &&
								line.toId === selectedFigureId),
					);

					if (!lineExists) {
						setLines((prev) => [
							...prev,
							{
								id: generateId(),
								fromId: selectedFigureId,
								toId: clickedFigure.id,
							},
						]);
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
			createFigureAtPosition(canvasX, canvasY);
		}
	};

	const handleScroll = (event: any) => {
		scrollPosition.current = {
			x: event.nativeEvent.contentOffset.x,
			y: event.nativeEvent.contentOffset.y,
		};
	};

	const handleMoveStart = (figureId: string) => {
		setMovingFigureId(figureId);
	};

	const handleMoveEnd = (figureId: string, x: number, y: number) => {
		setFigures((prev) =>
			prev.map((figure) =>
				figure.id === figureId ? { ...figure, x, y } : figure,
			),
		);
		setMovingFigureId(null);
	};

	// Отрисовка линий
	const renderLines = () => {
		return lines.map((line) => {
			const fromFigure = figures.find((f) => f.id === line.fromId);
			const toFigure = figures.find((f) => f.id === line.toId);

			if (!fromFigure || !toFigure) return null;

			const fromCenterX = fromFigure.x + fromFigure.width / 2;
			const fromCenterY = fromFigure.y + fromFigure.height / 2;
			const toCenterX = toFigure.x + toFigure.width / 2;
			const toCenterY = toFigure.y + toFigure.height / 2;

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
		return figures.map((figure) => (
			<DraggableFigure
				key={figure.id}
				figure={figure}
				isSelected={selectedFigureId === figure.id}
				isConnecting={isConnecting}
				isMoving={movingFigureId === figure.id}
				onMoveStart={handleMoveStart}
				onMoveEnd={handleMoveEnd}
				enabled={selectedShape === 'move'}
			/>
		));
	};

	const handleCancelConnection = () => {
		setIsConnecting(false);
		setSelectedFigureId(null);
	};

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
				<ScrollView
					ref={scrollViewRef}
					scrollEnabled={selectedShape !== 'move'}
					onScroll={handleScroll}
					scrollEventThrottle={16}
					contentContainerStyle={{
						width: canvasSize.width,
						height: canvasSize.height,
					}}
					style={{ flex: 1 }}>
					<TapGestureHandler
						ref={tapRef}
						onHandlerStateChange={onTapHandler}
						numberOfTaps={1}>
						<View
							onLayout={onCanvasLayout}
							style={{
								width: canvasSize.width,
								height: canvasSize.height,
								backgroundColor: '#ffffff',
								position: 'relative',
							}}
						>
							{renderLines()}
							{renderFigures()}
						</View>
					</TapGestureHandler>
				</ScrollView>

				<GenealogyToolbar
					selectedShape={selectedShape}
					setSelectedShape={(shape) => {
						setSelectedShape(shape);
						if (shape !== 'line') {
							setIsConnecting(false);
							setSelectedFigureId(null);
						}
						if (shape !== 'move') {
							setMovingFigureId(null);
						}
					}}
					isConnecting={isConnecting}
					onCancelConnection={handleCancelConnection}
				/>
			</View>
		</GestureHandlerRootView>
	);
};