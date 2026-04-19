import { useFamiliesUsers } from '@/entities/user/hooks/useFamiliesUser';
import { FamilyActions } from '@/features/family-actions/family-actions';
import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { capitalize } from '@/shared/lib/capitalize';
import { FamilyUserType } from '@/shared/types/families-user-type';
import { DinamicScrollView } from '@/shared/ui/dinamic-scroll-view/dinamic-scroll-view';
import { NoData } from '@/shared/ui/no-data/no-data';
import { Spinner } from '@/shared/ui/spiner/spiner';
import { Typography } from '@/shared/ui/Typography/Typography';
import { StyleSheet, TouchableOpacity } from 'react-native';

type FamilyModalActionsProps = {
	isVisibleModal: boolean;
    setIsVisibleModal: (isVisible: boolean) => void;
};

export const FamilyModalActions = ({
	isVisibleModal
}: FamilyModalActionsProps) => {
	const { families, loading, error } = useFamiliesUsers();

	if (error) {
		return;
	}

	if (loading) {
		return <Spinner />;
	}
// у семьи можно получить uid и закинуть в человека при клике
	return (
		isVisibleModal && <VerLayout styles={styleFamilyModal.modal}>
			{families.length !== 0 ? (
				<DinamicScrollView maxHeight={400}>
					{families.map((family: FamilyUserType) => (
						<TouchableOpacity style={styleFamilyModal.family} key={family.inviteCode}>
							<Typography style={styleFamilyModal.text}>{capitalize(family.nameFamily)}</Typography>
						</TouchableOpacity>
					))}
				</DinamicScrollView>
			) : (
				<NoData
					title='Беда!'
					desctiption='У Вас ещё нет не одной семьи'
					colorText={COLORS.black}
				/>
			)}
			<FamilyActions />
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
