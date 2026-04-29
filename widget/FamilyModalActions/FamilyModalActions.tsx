
import { FamiliesUser } from '@/features/family-actions/families-user/families-user';
import { FamilyActions } from '@/features/family-actions/family-actions';
import { COLORS } from '@/shared/constants/colors';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { Pressable, StyleSheet } from 'react-native';
type FamilyModalActionsProps = {
	isVisibleModal: boolean;
	setIsVisibleModal: (isVisible: boolean) => void;
};

export const FamilyModalActions = ({
	isVisibleModal,
	setIsVisibleModal,
}: FamilyModalActionsProps) => {

	return (
		isVisibleModal && (
			<>
				<VerLayout styles={styleFamilyModal.modal}>
					<FamiliesUser />
					<FamilyActions />
				</VerLayout>
				<Pressable
					style={styleFamilyModal.overlay}
					onPress={() => setIsVisibleModal(false)}
				/>
			</>
		)
	);
};

const styleFamilyModal = StyleSheet.create({
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 4,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},

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
});
