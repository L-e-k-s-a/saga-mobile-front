import { COLORS } from '@/shared/constants/colors';
import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import Svg from 'react-native-svg';
import { GenealogyToolbar, Shape } from './genealogy-toolbar';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Genealogy = () => {
	const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
	const scale = useSharedValue(1);
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const pinchGesture = Gesture.Pinch().onUpdate((event) => {
		scale.value = event.scale;
	});

	const panGesture = Gesture.Pan().onUpdate((event) => {
		translateX.value = event.translationX;
		translateY.value = event.translationY;
	});

	const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
			{ scale: scale.value },
		],
	}));

	return (
		<View style={styles.container}>
			<GenealogyToolbar
				selectedShape={selectedShape}
				onSelectedShape={setSelectedShape}
			/>
			<GestureDetector gesture={composedGesture}>
				<Animated.View style={[styles.canvas, animatedStyle]}>
					<Svg
						width={2000}
						height={2000}></Svg>
				</Animated.View>
			</GestureDetector>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.primary,
	},
	canvas: {
		width: 2000,
		height: 2000,
	},
});
