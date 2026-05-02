import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDecay,
  runOnJS,
} from 'react-native-reanimated';
import { VerLayout } from '../VerLayout/VerLayout';

type AlignContainerProps = {
  children: React.ReactNode;
};

export const AlignContainer = ({ children }: AlignContainerProps) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = translateY.value;
    })
    .onUpdate((event) => {
      // Ограничиваем максимальное "растяжение"
      const newValue = context.value + event.translationY;
      
      // Добавляем сопротивление при растяжении (эффект резины)
      if (Math.abs(newValue) > 100) {
        translateY.value = context.value + (event.translationY * 0.3);
      } else {
        translateY.value = newValue;
      }
    })
    .onEnd((event) => {
      // Если потянули достаточно сильно — отскакиваем с эффектом
      if (Math.abs(event.velocityY) > 500) {
        translateY.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
          mass: 0.5,
        });
      } else {
        // Плавно возвращаем в исходное положение
        translateY.value = withSpring(0, {
          damping: 20,
          stiffness: 200,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[stylesContainer.container, animatedStyle]}>
        <VerLayout styles={stylesContainer.container}>
          {children}
        </VerLayout>
      </Animated.View>
    </GestureDetector>
  );
};

const stylesContainer = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
});