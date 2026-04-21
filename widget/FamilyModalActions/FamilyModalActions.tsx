import { Family } from '@/entities/family/family';
import { useFamiliesUsers } from '@/entities/user/hooks/use-get-families-user';
import { FamilyActions } from '@/features/family-actions/family-actions';
import { COLORS } from '@/shared/constants/colors';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { capitalize } from '@/shared/lib/capitalize';
import { useFamilyStore } from '@/shared/store/family/family-store';
import { useUserStore } from '@/shared/store/user/user-store';
import { DinamicScrollView } from '@/shared/ui/dinamic-scroll-view/dinamic-scroll-view';
import { NoData } from '@/shared/ui/no-data/no-data';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { Typography } from '@/shared/ui/typography/typography';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type FamilyModalActionsProps = {
	isVisibleModal: boolean;
	setIsVisibleModal: (isVisible: boolean) => void;
};

export const FamilyModalActions = ({
	isVisibleModal,
}: FamilyModalActionsProps) => {
	const { data: families, isLoading, error, refetch } = useFamiliesUsers();
	const { countFamily, setActiveFamily, activeFamily } = useUserStore();
	const { setInviteCode, setNameFamily } = useFamilyStore();

	useEffect(() => {
		refetch();
	}, [countFamily]);

	if (error) {
		return;
	}

	if (!families) {
		return;
	}

	if (isLoading) {
		return <Spinner />;
	}

	return (
		isVisibleModal && (
			<VerLayout styles={styleFamilyModal.modal}>
				{families.length !== 0 ? (
					<DinamicScrollView maxHeight={170}>
						{families.map((family: Family) => (
							<TouchableOpacity
								style={[
									styleFamilyModal.family,
									family.uid === activeFamily
										? { opacity: 1, borderColor: COLORS.primary }
										: { opacity: 0.3 },
								]}
								key={family.inviteCode}
								onPress={() => {
									setNameFamily(family.nameFamily);
									setActiveFamily(family.uid);
									setInviteCode(family.inviteCode);
								}}>
								<Typography
									fontSize='24'
									textColor='secondary'
									style={styleFamilyModal.text}>
									{capitalize(family.nameFamily)}
								</Typography>
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
		)
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
		marginTop: 8,
		borderWidth: 1,
		borderRadius: 10,
	},
	text: {
		padding: 5,
		width: '100%',
		textAlign: 'center',
	},
});
