import { BORDER_RADII } from '@/shared/constants/borderRadii';
import { COLORS } from '@/shared/constants/colors';
import { GAPS } from '@/shared/constants/gaps';
import { PADDINGS } from '@/shared/constants/paddings';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { useFamilyStore } from '@/shared/store/family/family-store';
import { Input } from '@/shared/ui/Input/Input';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '../../shared/ui/buttons/Button/Button';
import { CreateFamilyForm } from '../forms/create-family-form/create-family-form';

export const FamilyActions = () => {
	const [isJoin, setIsJoin] = useState(false);
	const [isCreate, setIsCreate] = useState(false);
	const [isAdd, setIsAdd] = useState(false);
	const [codeJoin, setCodeJoin] = useState('');
	const { inviteCode } = useFamilyStore();

	const handleJoinFamily = () => {
		setIsJoin(false);
	};

	return (
		<VerLayout styles={styleFamilyAction.actions}>
			{isCreate ? (
				<CreateFamilyForm setIsVisible={setIsCreate} />
			) : (
				<Button
					style={styleFamilyAction.item}
					variant='secondary'
					text='Создать семью'
					onPress={() => setIsCreate(true)}
				/>
			)}
			{isAdd ? (
				<Button
					style={[styleFamilyAction.button, styleFamilyAction.item]}
					variant='secondary'
					text={inviteCode.toUpperCase()}
					onPress={() => setIsAdd(false)}
				/>
			) : (
				<Button
					style={styleFamilyAction.item}
					variant='secondary'
					text='Добавить'
					onPress={() => setIsAdd(true)}
				/>
			)}
			{isJoin ? (
				<HorLayout style={styleFamilyAction.codeContainer}>
					<Input
						placeholder='Введите код другой семьи'
						value={codeJoin.toUpperCase()}
						onChangeText={(text) => setCodeJoin(text)}
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
		width: '33%',
		fontSize: 20,
	},
});
