import { Typography } from '@/shared/ui/typography/typography';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
	Dimensions,
	LayoutChangeEvent,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
	State,
	TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { EditFigureModal, GenealogyFigure, Shape } from './genealogy-figure';
import { GenealogyTools } from './genealogy-tools';
import { COLORS } from '@/shared/constants/colors';

type FigureType = 'rectangle' | 'circle';

// Обновляем интерфейс Figure, добавляя текст
interface Figure {
	id: string;
	type: FigureType;
	x: number;
	y: number;
	width: number;
	height: number;
	title?: string;
	description?: string;
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

// Компонент для отрисовки одной фигуры с возможностью перетаскивания и редактирования
const DraggableFigure: React.FC<{
	figure: Figure;
	isSelected: boolean;
	isConnecting: boolean;
	isMoving: boolean;
	onMoveStart: (id: string) => void;
	onMoveEnd: (id: string, x: number, y: number) => void;
	onPress?: (id: string) => void;
	onLongPress?: (id: string) => void;
	enabled: boolean;
}> = ({
	figure,
	isSelected,
	isConnecting,
	isMoving,
	onMoveStart,
	onMoveEnd,
	onPress,
	onLongPress,
	enabled,
}) => {
	const posX = useSharedValue(figure.x);
	const posY = useSharedValue(figure.y);
	const startX = useSharedValue(0);
	const startY = useSharedValue(0);
	const startPosX = useSharedValue(0);
	const startPosY = useSharedValue(0);

	React.useEffect(() => {
		posX.value = figure.x;
		posY.value = figure.y;
	}, [figure.x, figure.y]);

	// Жест для нажатия (только когда не в режиме перемещения)
	const tapGesture = Gesture.Tap()
		.numberOfTaps(1)
		.onEnd(() => {
			if (onPress) {
				runOnJS(onPress)(figure.id);
			}
		});

	// Жест для долгого нажатия
	const longPressGesture = Gesture.LongPress().onStart(() => {
		if (onLongPress) {
			runOnJS(onLongPress)(figure.id);
		}
	});

	// Жест для перетаскивания (только в режиме move)
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
			runOnJS(onMoveEnd)(figure.id, posX.value, posY.value);
		})
		.enabled(enabled);

	// В режиме move используем pan жест, иначе - tap + longPress
	const activeGesture = enabled
		? panGesture
		: Gesture.Race(tapGesture, longPressGesture);

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
		<GestureDetector gesture={activeGesture}>
			<Animated.View style={animatedStyle}>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						padding: 8,
					}}>
					{/* Отображаем заголовок, если есть */}
					{figure.title ? (
						<Typography
							style={{
								color: 'white',
								fontWeight: 'bold',
								fontSize: 14,
								textAlign: 'center',
								marginBottom: 4,
							}}>
							{figure.title}
						</Typography>
					) : (
						<View
							style={{
								width: 30,
								height: 30,
								backgroundColor: 'rgba(255,255,255,0.3)',
								borderRadius: figure.type === 'circle' ? 15 : 4,
							}}
						/>
					)}
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
	const [isHide, setIsHide] = useState(false);
	// Состояния для модального окна редактирования
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [editingFigureId, setEditingFigureId] = useState<string | null>(null);
	const [editingTitle, setEditingTitle] = useState('');
	const [editingDescription, setEditingDescription] = useState('');

	const scrollViewRef = useRef<ScrollView>(null);
	const scrollPosition = useRef({ x: 0, y: 0 });
	const canvasLayoutRef = useRef({ x: 0, y: 0 });

	const canvasSize = { width: SCREEN_WIDTH * 3, height: SCREEN_HEIGHT * 3 };
	const tapRef = useRef(null);

	const generateId = () => `${Date.now()}-${Math.random()}`;

	// Функция для обработки клика по фигуре в режиме line
	const handleLineModePress = (figureId: string) => {
		if (!isConnecting) {
			setIsConnecting(true);
			setSelectedFigureId(figureId);
		} else if (selectedFigureId && selectedFigureId !== figureId) {
			const lineExists = lines.some(
				(line) =>
					(line.fromId === selectedFigureId && line.toId === figureId) ||
					(line.fromId === figureId && line.toId === selectedFigureId),
			);

			if (!lineExists) {
				setLines((prev) => [
					...prev,
					{
						id: generateId(),
						fromId: selectedFigureId,
						toId: figureId,
					},
				]);
			}
			setIsConnecting(false);
			setSelectedFigureId(null);
		} else if (selectedFigureId === figureId) {
			setIsConnecting(false);
			setSelectedFigureId(null);
		}
	};

	// Функция для обработки клика по фигуре в режиме trash
	const handleTrashModePress = (figureId: string) => {
		setFigures((prev) => prev.filter((f) => f.id !== figureId));
		setLines((prev) =>
			prev.filter((line) => line.fromId !== figureId && line.toId !== figureId),
		);
	};

	// Функция для открытия модального окна редактирования в режиме hand
	const handleHandModePress = (figureId: string) => {
		const figure = figures.find((f) => f.id === figureId);
		if (figure) {
			setEditingFigureId(figureId);
			setEditingTitle(figure.title || '');
			setEditingDescription(figure.description || '');
			setEditModalVisible(true);
		}
	};

	// Функция для обработки долгого нажатия в режиме hand (удаление)
	const handleHandModeLongPress = (figureId: string) => {
		setFigures((prev) => prev.filter((f) => f.id !== figureId));
		setLines((prev) =>
			prev.filter((line) => line.fromId !== figureId && line.toId !== figureId),
		);
	};

	// Общий обработчик нажатия на фигуру
	const handleFigurePress = (figureId: string) => {
		switch (selectedShape) {
			case 'line':
				handleLineModePress(figureId);
				break;
			case 'trash':
				handleTrashModePress(figureId);
				break;
			case 'hand':
				handleHandModePress(figureId);
				break;
			default:
				break;
		}
	};

	// Общий обработчик долгого нажатия
	const handleFigureLongPress = (figureId: string) => {
		if (selectedShape === 'hand') {
			handleHandModeLongPress(figureId);
		}
	};

	// Функция сохранения текста в фигуре
	const handleSaveFigureText = (title: string, description: string) => {
		if (editingFigureId) {
			setFigures((prev) =>
				prev.map((figure) =>
					figure.id === editingFigureId
						? { ...figure, title, description }
						: figure,
				),
			);
		}
	};

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
			title: '',
			description: '',
		};

		setFigures((prev) => [...prev, newFigure]);
	};

	const onCanvasLayout = (event: LayoutChangeEvent) => {
		event.target.measureInWindow((x, y) => {
			canvasLayoutRef.current = { x, y };
		});
	};

	// Обработка тапа на канвасе (только для создания фигур)
	const onCanvasTap = (event: any) => {
		const { state, x, y } = event.nativeEvent;

		if (state !== State.ACTIVE) return;

		const canvasX = x;
		const canvasY = y;

		// Режим удаления - удаляем фигуру если кликнули по ней
		if (selectedShape === 'trash') {
			const figureToDelete = findFigureAtPosition(canvasX, canvasY);
			if (figureToDelete) {
				handleTrashModePress(figureToDelete.id);
			}
			return;
		}

		// Режим линии - не создаем фигуры на пустом месте
		if (selectedShape === 'line') {
			return;
		}

		// Режим создания фигур (только на пустом месте, не на фигуре)
		if (selectedShape === 'rectangle' || selectedShape === 'circle') {
			const clickedFigure = findFigureAtPosition(canvasX, canvasY);
			if (!clickedFigure) {
				createFigureAtPosition(canvasX, canvasY);
			}
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
				onPress={() => handleFigurePress(figure.id)}
				onLongPress={() => handleFigureLongPress(figure.id)}
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
						onHandlerStateChange={onCanvasTap}
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

				{!isHide && <GenealogyFigure
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
				/>}

				{!isHide && <GenealogyTools
					selectedShape={selectedShape}
					setSelectedShape={(shape) => {
						setSelectedShape(shape);
						if (shape !== 'move') {
							setMovingFigureId(null);
						}
					}}
				/>}

				{/* Модальное окно редактирования */}
				<EditFigureModal
					visible={editModalVisible}
					onClose={() => setEditModalVisible(false)}
					onSave={handleSaveFigureText}
					initialTitle={editingTitle}
					initialDescription={editingDescription}
				/>
				<TouchableOpacity onPress={() => setIsHide(!isHide)} style={styles.eye}>
					<Ionicons name={isHide ? 'eye-off' : 'eye'} color={COLORS.secondary} size={32}/>
				</TouchableOpacity>
			</View>
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	eye: {
		position: 'absolute',
		top: '18%',
		left: '7%',
		padding: 10
	},
});
