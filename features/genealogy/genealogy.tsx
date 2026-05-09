import React, { useRef, useState } from 'react';
import {
	Dimensions,
	LayoutChangeEvent,
	ScrollView,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	PanGestureHandler,
	State,
	TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';
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
	const [selectedFigureForMove, setSelectedFigureForMove] = useState<
		string | null
	>(null);

	// Для ScrollView
	const scrollViewRef = useRef<ScrollView>(null);
	const scrollPosition = useRef({ x: 0, y: 0 });

	// Для определения позиции canvas view на экране
	const canvasLayoutRef = useRef({ x: 0, y: 0 });

	// Для перемещения фигур
	const figureStartX = useSharedValue(0);
	const figureStartY = useSharedValue(0);
	const figureOffsetX = useSharedValue(0);
	const figureOffsetY = useSharedValue(0);

	const canvasSize = { width: SCREEN_WIDTH * 3, height: SCREEN_HEIGHT * 3 };

	// Refs для жестов
	const tapRef = useRef(null);
	const movePanRef = useRef(null);

	// Генерация ID
	const generateId = () => `${Date.now()}-${Math.random()}`;

	// Поиск фигуры
	const findFigureAtPosition = (x: number, y: number) => {
		return figures.find((figure) => {
			const inX = x >= figure.x && x <= figure.x + figure.width;
			const inY = y >= figure.y && y <= figure.y + figure.height;
			return inX && inY;
		});
	};

	// Создание фигуры
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

	// Сохраняем позицию canvas view на экране
	const onCanvasLayout = (event: LayoutChangeEvent) => {
		event.target.measureInWindow((x, y) => {
			canvasLayoutRef.current = { x, y };
		});
	};

	// Обработка тапа - ИСПРАВЛЕННАЯ ВЕРСИЯ
	// Обработка тапа - ИСПРАВЛЕННАЯ ВЕРСИЯ
	const onTapHandler = (event: any) => {
		const { state, x, y } = event.nativeEvent;

		if (state !== State.ACTIVE) return;

		// Координаты из TapGestureHandler УЖЕ учитывают позицию скролла
		// НЕ нужно добавлять scrollPosition.current.x/y повторно!
		const canvasX = x;
		const canvasY = y;

		console.log('Tap coordinates:', {
			x,
			y,
			canvasX,
			canvasY,
			scrollPosition: scrollPosition.current,
		});

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

	// Обработка перемещения фигуры - тоже исправляем
	const onMoveGestureStart = (event: any) => {
		const { x, y } = event.nativeEvent;
		// Здесь тоже координаты уже учитывают скролл
		const canvasX = x;
		const canvasY = y;

		const figure = findFigureAtPosition(canvasX, canvasY);
		if (figure) {
			setSelectedFigureForMove(figure.id);
			figureStartX.value = figure.x;
			figureStartY.value = figure.y;
			figureOffsetX.value = figure.x;
			figureOffsetY.value = figure.y;
		}
	};

	// Обработка скролла
	const handleScroll = (event: any) => {
		scrollPosition.current = {
			x: event.nativeEvent.contentOffset.x,
			y: event.nativeEvent.contentOffset.y,
		};
	};

	// Обработка перемещения фигуры
	const onMoveGestureEvent = (event: any) => {
		const { translationX, translationY, state } = event.nativeEvent;

		if (state === State.ACTIVE) {
			const newX = figureStartX.value + translationX;
			const newY = figureStartY.value + translationY;

			figureOffsetX.value = newX;
			figureOffsetY.value = newY;

			// Обновляем позицию фигуры в реальном времени
			if (selectedFigureForMove) {
				setFigures((prev) =>
					prev.map((figure) =>
						figure.id === selectedFigureForMove
							? { ...figure, x: newX, y: newY }
							: figure,
					),
				);
			}
		}

		if (state === State.END || state === State.CANCELLED) {
			runOnJS(setSelectedFigureForMove)(null);
		}
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
		if (selectedShape === 'move') {
			// В режиме перемещения используем PanGestureHandler для каждой фигуры
			return figures.map((figure) => (
				<PanGestureHandler
					key={figure.id}
					ref={movePanRef}
					onGestureEvent={onMoveGestureEvent}
					onHandlerStateChange={onMoveGestureStart}
					simultaneousHandlers={[tapRef]}>
					<Animated.View
						style={{
							position: 'absolute',
							left: figure.x,
							top: figure.y,
							width: figure.width,
							height: figure.height,
							backgroundColor:
								selectedFigureId === figure.id && isConnecting
									? '#E3F2FD'
									: '#4CAF50',
							borderRadius: figure.type === 'circle' ? figure.width / 2 : 8,
							borderWidth: 2,
							borderColor:
								selectedFigureId === figure.id && isConnecting
									? '#2196F3'
									: '#388E3C',
							opacity: selectedFigureForMove === figure.id ? 0.7 : 1,
						}}>
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
				</PanGestureHandler>
			));
		}

		// Обычный режим - используем TouchableOpacity
		return figures.map((figure) => (
			<TouchableOpacity
				key={figure.id}
				style={{
					position: 'absolute',
					left: figure.x,
					top: figure.y,
					width: figure.width,
					height: figure.height,
					backgroundColor:
						selectedFigureId === figure.id && isConnecting
							? '#E3F2FD'
							: '#4CAF50',
					borderRadius: figure.type === 'circle' ? figure.width / 2 : 8,
					borderWidth: 2,
					borderColor:
						selectedFigureId === figure.id && isConnecting
							? '#2196F3'
							: '#388E3C',
				}}
				activeOpacity={1}
				onPress={() => {
					if (selectedShape === 'trash') {
						setFigures((prev) => prev.filter((f) => f.id !== figure.id));
						setLines((prev) =>
							prev.filter(
								(line) => line.fromId !== figure.id && line.toId !== figure.id,
							),
						);
					} else if (selectedShape === 'line') {
						if (!isConnecting) {
							setIsConnecting(true);
							setSelectedFigureId(figure.id);
						} else if (selectedFigureId && selectedFigureId !== figure.id) {
							const lineExists = lines.some(
								(line) =>
									(line.fromId === selectedFigureId &&
										line.toId === figure.id) ||
									(line.fromId === figure.id && line.toId === selectedFigureId),
							);

							if (!lineExists) {
								setLines((prev) => [
									...prev,
									{
										id: generateId(),
										fromId: selectedFigureId,
										toId: figure.id,
									},
								]);
							}
							setIsConnecting(false);
							setSelectedFigureId(null);
						} else if (selectedFigureId === figure.id) {
							setIsConnecting(false);
							setSelectedFigureId(null);
						}
					}
				}}>
				<View
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<View
						style={{
							width: 30,
							height: 30,
							backgroundColor: 'rgba(255,255,255,0.3)',
							borderRadius: figure.type === 'circle' ? 15 : 4,
						}}
					/>
				</View>
			</TouchableOpacity>
		));
	};

	const handleCancelConnection = () => {
		setIsConnecting(false);
		setSelectedFigureId(null);
	};

	return (
		<View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
			<ScrollView
				ref={scrollViewRef}
				scrollEnabled={selectedShape === 'move' ? false : true}
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
						}}>
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
						setSelectedFigureForMove(null);
					}
				}}
				isConnecting={isConnecting}
				onCancelConnection={handleCancelConnection}
			/>
		</View>
	);
};
