import { BORDER_RADII } from '@/shared/constants/borderRadii';
import { COLORS } from '@/shared/constants/colors';
import { GAPS } from '@/shared/constants/gaps';
import { PADDINGS } from '@/shared/constants/paddings';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { Input } from '@/shared/ui/Input/Input';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '../../shared/ui/buttons/Button/Button';

type FamilyActionsProps = {
	handleCreateFamily: (isVisible: boolean) => void;
	handleJoinToFamily: (isJoin: boolean) => void;
};

export const FamilyActions = ({ handleCreateFamily }: FamilyActionsProps) => {
	const [isJoin, setIsJoin] = useState(false);
	const [code, setCode] = useState('');

	const handleJoinFamily = () => {
		setIsJoin(false);
	};

	return (
		<VerLayout styles={styleFamilyAction.actions}>
			<Button
				style={styleFamilyAction.item}
				variant='secondary'
				text='Создать семью'
				onPress={() => handleCreateFamily(true)}
			/>
			<Button
				style={styleFamilyAction.item}
				variant='secondary'
				text='Добавить'
				onPress={() => {}}
			/>
			{isJoin ? (
				<HorLayout style={styleFamilyAction.codeContainer}>
					<Input
						placeholder='Введите код другой семьи'
						value={code.toUpperCase()}
						onChangeText={(text) => setCode(text)}
						style={styleFamilyAction.input}
					/>
					<Button
						style={styleFamilyAction.button}
						text='Вперёд'
						variant='secondary'
						onPress={handleJoinFamily}
					/>
				</HorLayout>
			) : (
				<Button
					style={styleFamilyAction.item}
					variant='secondary'
					text='Присоединиться'
					onPress={() => setIsJoin(true)}
				/>
			)}
		</VerLayout>
	);
};

const styleFamilyAction = StyleSheet.create({
	actions: {
		gap: 8,
	},
	item: {
		width: '100%',
	},
	codeContainer: {
		justifyContent: 'space-between',
		width: '100%',
	},
	input: {
		borderWidth: 0.5,
		backgroundColor: COLORS.primaryColorBackgroundInput,
		borderRadius: BORDER_RADII.primary,
		height: 52,
		width: '65%',
		paddingHorizontal: PADDINGS.px16,
		fontSize: 16,
		marginTop: GAPS.px8,
	},
	button: {
		width: '30%',
		fontSize: 20,
	},
});
