import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { StyleSheet } from 'react-native';
import { Button } from '../button/Button';

type ButtonCrossProps = {
	close: (isVisible: boolean) => void;
};

export const ButtonCross = ({ close }: ButtonCrossProps) => {
	return (
		<HorLayout style={styleButtonCross.crossContainer}>
			<Button
				text='x'
				onPress={() => close(false)}
				style={styleButtonCross.cross}
			/>
		</HorLayout>
	);
};

const styleButtonCross = StyleSheet.create({
	crossContainer: {
		width: '100%',
		height: 50,
		justifyContent: 'flex-end',
	},
	cross: {
		padding: 8,
		width: '16%',
	},
	sizeCross: {
		fontSize: 24,
	},
});
