import { COLORS } from '@/shared/constants/colors';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { StyleSheet } from 'react-native';
import { Button } from '../../Button/Button';

type DropDowmFamilyProps = {
	isVisible: boolean;
	handleCreateFamily: (isVisible: boolean) => void;
};

export const DropDownFamily = ({ isVisible, handleCreateFamily }: DropDowmFamilyProps) => {
	return (
		isVisible && (
			<VerLayout styles={styleDropDownFamily.dropDown}>
				<Button
					style={styleDropDownFamily.item}
					variant='secondary'
					text='Создать семью'
					onPress={() => handleCreateFamily(true)}
				/>
				<Button
					style={styleDropDownFamily.item}
					variant='secondary'
					text='Добавить'
					onPress={() => {}}
				/>
				<Button
					style={styleDropDownFamily.item}
					variant='secondary'
					text='Присоединиться'
					onPress={() => {}}
				/>
			</VerLayout>
		)
	);
};

const styleDropDownFamily = StyleSheet.create({
	dropDown: {
		position: 'absolute',
		top: 90,
		left: 0,
		right: 0,
		backgroundColor: COLORS.white,
		paddingVertical: 20,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		zIndex: 5,
		gap: 10,
		paddingHorizontal: 10,
	},
	item: {
		width: '100%',
	},
});
