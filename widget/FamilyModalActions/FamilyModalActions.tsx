import { useFamiliesUsers } from '@/entities/user/hooks/useFamiliesUser';
import { FamilyActions } from '@/features/family-actions/family-actions';
import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { capitalize } from '@/shared/lib/capitalize';
import { FamilyUserType } from '@/shared/types/families-user-type';
import { NoData } from '@/shared/ui/no-data/no-data';
import { Spinner } from '@/shared/ui/spiner/spiner';
import { Typography } from '@/shared/ui/Typography/Typography';
import { StyleSheet } from 'react-native';

type FamilyModalActionsProps = {
	isVisibleModal: boolean;
    setIsVisibleModal: (isVisible: boolean) => void;
	handleCreateFamily: (isVisible: boolean) => void;
};

export const FamilyModalActions = ({
	isVisibleModal,
	handleCreateFamily,
}: FamilyModalActionsProps) => {
	const { families, loading, error } = useFamiliesUsers();

	if (error) {
		return;
	}

	if (loading) {
		return <Spinner />;
	}

	return (
		isVisibleModal && <VerLayout styles={styleFamilyModal.modal}>
			{families.length !== 0 ? (
				families.map((family: FamilyUserType) => (
					<HorLayout style={styleFamilyModal.family}>
						<Typography style={styleFamilyModal.text} key={family.inviteCode}>{capitalize(family.nameFamily)}</Typography>
					</HorLayout>
				))
			) : (
				<NoData
					title='Беда!'
					desctiption='У Вас ещё нет не одной семьи'
					colorText={COLORS.black}
				/>
			)}
			<FamilyActions
				handleCreateFamily={handleCreateFamily}
			/>
		</VerLayout>
	);
};

const styleFamilyModal = StyleSheet.create({
	modal: {
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
	family: {
		borderWidth: 1,
		borderRadius: 10,
	},
	text: {
		padding: 5,
		width: "100%",
		color: COLORS.black,
		fontSize: 24,
		textAlign: 'center'
	}
});
