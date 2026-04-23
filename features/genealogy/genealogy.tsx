import {
	Canvas,
	Group,
	Path,
	Rect,
	Text as SkiaText,
	useFont,
} from '@shopify/react-native-skia';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface Shape {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	text: string;
}

export default function InfiniteCanvas() {
	const [shapes, setShapes] = useState<Shape[]>([
		{ id: '1', x: 100, y: 100, width: 150, height: 80, text: 'Карточка 1' },
		{ id: '2', x: 400, y: 300, width: 150, height: 80, text: 'Карточка 2' },
	]);

	const [offsetX, setOffsetX] = useState(0);
	const [offsetY, setOffsetY] = useState(0);

	// Используем системный шрифт через useFont с undefined
	// Это позволит использовать стандартный шрифт платформы
	const font = useFont(null, 14);

	const panGesture = Gesture.Pan().onUpdate((e: any) => {
		setOffsetX((prev) => prev + e.changeX);
		setOffsetY((prev) => prev + e.changeY);
	});

	const drawArrow = (
		from: { x: number; y: number },
		to: { x: number; y: number },
	) => {
		const linePath = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
		const angle = Math.atan2(to.y - from.y, to.x - from.x);
		const arrowSize = 15;
		const arrow1 = {
			x: to.x - arrowSize * Math.cos(angle - Math.PI / 6),
			y: to.y - arrowSize * Math.sin(angle - Math.PI / 6),
		};
		const arrow2 = {
			x: to.x - arrowSize * Math.cos(angle + Math.PI / 6),
			y: to.y - arrowSize * Math.sin(angle + Math.PI / 6),
		};
		const arrowPath = `${linePath} M ${arrow1.x} ${arrow1.y} L ${to.x} ${to.y} L ${arrow2.x} ${arrow2.y}`;
		return arrowPath;
	};

	return (
		<View style={styles.container}>
			<GestureDetector gesture={panGesture}>
				<Canvas style={styles.canvas}>
					<Group transform={[{ translateX: offsetX }, { translateY: offsetY }]}>
						{/* Стрелки */}
						{shapes.length >= 2 && (
							<Path
								path={drawArrow(
									{
										x: shapes[0].x + shapes[0].width,
										y: shapes[0].y + shapes[0].height / 2,
									},
									{ x: shapes[1].x, y: shapes[1].y + shapes[1].height / 2 },
								)}
								strokeWidth={2}
								color='blue'
								style='stroke'
							/>
						)}

						{/* Прямоугольники/карточки */}
						{shapes.map((shape) => (
							<Group key={shape.id}>
								<Rect
									x={shape.x}
									y={shape.y}
									width={shape.width}
									height={shape.height}
									color='lightblue'
								/>
								<Rect
									x={shape.x}
									y={shape.y}
									width={shape.width}
									height={shape.height}
									color='black'
									style='stroke'
									strokeWidth={2}
								/>
								{font && (
									<SkiaText
										x={shape.x + 10}
										y={shape.y + shape.height / 2 + 5}
										text={shape.text}
										color='black'
										font={font}
									/>
								)}
							</Group>
						))}
					</Group>
				</Canvas>
			</GestureDetector>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#f0f0f0' },
	canvas: { flex: 1 },
});
