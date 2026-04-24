import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleModal } from '@/shared/styles/modal';
import { ReactNode, useRef } from 'react';
import { Animated, Dimensions, Modal, PanResponder, View } from 'react-native';
import { Card } from '../card/card';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type ModalWindowProps = {
	visible: boolean;
	content: () => ReactNode;
	onClose?: () => void;
};

export const ModalWindow = ({
	visible,
	content,
	onClose,
}: ModalWindowProps) => {
	const translateY = useRef(new Animated.Value(0)).current;

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onMoveShouldSetPanResponder: (_, gestureState) => {
			return Math.abs(gestureState.dy) > 5;
		},
		onPanResponderMove: (_, gestureState) => {
			if (gestureState.dy > 0) {
				translateY.setValue(gestureState.dy);
			}
		},
		onPanResponderRelease: (_, gestureState) => {
			if (gestureState.dy > 70) {
				Animated.timing(translateY, {
					toValue: SCREEN_HEIGHT,
					duration: 250,
					useNativeDriver: true,
				}).start(() => {
					onClose?.();
					translateY.setValue(0);
				});
			} else {
				Animated.spring(translateY, {
					toValue: 0,
					useNativeDriver: true,
					speed: 12,
					bounciness: 4,
				}).start();
			}
		},
	});

	return (
		<Modal
			visible={visible}
			transparent={true}
			animationType='none'>
			<VerLayout styles={styleModal.modalOverlay}>
				<Animated.View
					style={[
						{
							transform: [{ translateY: translateY }],
						},
						styleModal.modalContent,
					]}>
					<Card>
						<View
							{...panResponder.panHandlers}
							style={styleModal.dragIndicatorContainer}>
							<View style={styleModal.dragIndicator} />
						</View>
						{content()}
					</Card>
				</Animated.View>
			</VerLayout>
		</Modal>
	);
};
