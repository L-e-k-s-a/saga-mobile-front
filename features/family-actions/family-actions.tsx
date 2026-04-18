import { COLORS } from '@/shared/constants/colors';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { StyleSheet } from 'react-native';
import { Button } from '../../shared/ui/Button/Button';

type FamilyActionsProps = {
	handleCreateFamily: (isVisible: boolean) => void;
};

export const FamilyActions = ({
	handleCreateFamily,
}: FamilyActionsProps) => {
	return (
		(
			<VerLayout styles={styleDropDownFamily.actions}>
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
	actions: {
		gap: 8
	},
	item: {
		width: '100%',
	},
});
