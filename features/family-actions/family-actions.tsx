import { COLORS } from '@/shared/constants/colors';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { useFamilyStore } from '@/shared/store/family/family-store';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '../../shared/ui/buttons/button/Button';
import { CreateFamilyForm } from '../forms/create-family-form/create-family-form';
import { JoinFamilyForm } from '../forms/join-family-form/join-family-form';

export const FamilyActions = () => {
	const [isJoin, setIsJoin] = useState(false);
	const [isCreate, setIsCreate] = useState(false);
	const [isAdd, setIsAdd] = useState(false);
	const { inviteCode } = useFamilyStore();

	return (
		<VerLayout styles={styleFamilyAction.actions}>
			{isCreate ? (
				<CreateFamilyForm setIsVisible={setIsCreate} />
			) : (
				<Button
					style={styleFamilyAction.item}
					text='Создать семью'
					onPress={() => setIsCreate(true)}
				/>
			)}
			{isAdd ? (
				<Button
					style={[styleFamilyAction.button, styleFamilyAction.item]}
					text={inviteCode.toUpperCase()}
					onPress={() => setIsAdd(false)}
				/>
			) : (
				<Button
					style={styleFamilyAction.item}
					text='Добавить'
					onPress={() => setIsAdd(true)}
				/>
			)}
			{isJoin ? (
				<JoinFamilyForm setIsVisible={setIsJoin}/>
			) : (
				<Button
					style={styleFamilyAction.item}
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
		borderRadius: 10,
		height: 52,
		width: '65%',
		paddingHorizontal: 16,
		fontSize: 16,
		marginTop: 8,
	},
	button: {
		width: '33%',
		fontSize: 20,
	},
});
