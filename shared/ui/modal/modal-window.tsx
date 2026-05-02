import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleModal } from '@/shared/styles/modal';
import { ReactNode, useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  Modal,
  PanResponder,
  Platform,
  View,
} from 'react-native';
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
  const keyboardOffset = useRef(new Animated.Value(0)).current; // ← смещение для клавиатуры
  const isClosing = useRef(false);

  const handleShow = () => {
    isClosing.current = false;
    translateY.setValue(0);
    keyboardOffset.setValue(0); // ← сбрасываем смещение клавиатуры при открытии
  };

  // Подписка на события клавиатуры
  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event) => {
        const keyboardHeight = event.endCoordinates.height;
        
        // Плавно поднимаем окно на высоту клавиатуры
        Animated.timing(keyboardOffset, {
          toValue: -keyboardHeight / 2, // ← делим на 2, чтобы окно было по центру оставшегося пространства
          duration: event.duration || 250, // ← используем скорость анимации клавиатуры
          useNativeDriver: true,
        }).start();
      }
    );

    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      (event) => {
        // Возвращаем окно на место
        Animated.timing(keyboardOffset, {
          toValue: 0,
          duration: event.duration || 250,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardOffset]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dy) > 5,
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dy > 0 && !isClosing.current) {
            // Скрываем клавиатуру при свайпе вниз
            Keyboard.dismiss();
            translateY.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dy > 70 && !isClosing.current) {
            isClosing.current = true;
            // Скрываем клавиатуру перед закрытием
            Keyboard.dismiss();
            Animated.timing(translateY, {
              toValue: SCREEN_HEIGHT,
              duration: 250,
              useNativeDriver: true,
            }).start(() => {
              onClose?.();
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
      }),
    [onClose, translateY]
  );

  // Комбинируем смещение от жеста и от клавиатуры
  const combinedTranslateY = Animated.add(translateY, keyboardOffset);

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      onShow={handleShow}
      animationType="fade"
    >
      <VerLayout styles={styleModal.modalOverlay}>
        <Animated.View
          style={[
            {
              transform: [{ translateY: combinedTranslateY }], // ← используем комбинированное смещение
            },
            styleModal.modalContent,
          ]}
        >
          <Card>
            <View
              {...panResponder.panHandlers}
              style={styleModal.dragIndicatorContainer}
            >
              <View style={styleModal.dragIndicator} />
            </View>
            {content()}
          </Card>
        </Animated.View>
      </VerLayout>
    </Modal>
  );
};