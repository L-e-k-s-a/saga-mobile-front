import { StyleSheet } from 'react-native';
import { Button } from '../button/Button';

type ButtonAddProps = {
	action: () => void;
};

export const ButtonAdd = ({ action }: ButtonAddProps) => {
	return (
		<Button
			text='Добавить'
			variant='secondary'
			onPress={action}
			style={styleButtonAdd.add}
		/>
	);
};

const styleButtonAdd = StyleSheet.create({
	add: {
		position: 'absolute',
		bottom: 85,
		right: 0,
		width: 120,
	},
});
