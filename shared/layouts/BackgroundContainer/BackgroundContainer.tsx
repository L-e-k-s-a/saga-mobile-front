import { COLORS } from '@/shared/constants/colors';
import { StyleSheet, View } from 'react-native';

type BackgroundContainerProps = {
	children: React.ReactNode;
};

export const BackgroundContainer = ({ children }: BackgroundContainerProps) => {
	return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.darkGray,
	},
});
