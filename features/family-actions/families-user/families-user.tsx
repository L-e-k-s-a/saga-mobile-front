import { Family } from '@/entities/family/type/family';
import { useFamiliesUsers } from '@/entities/user/hooks/use-get-families-user';
import { COLORS } from '@/shared/constants/colors';
import { capitalize } from '@/shared/lib/capitalize';
import { useFamilyStore } from '@/shared/store/family/family-store';
import { useUserStore } from '@/shared/store/user/user-store';
import { DinamicScrollView } from '@/shared/ui/dinamic-scroll-view/dinamic-scroll-view';
import { NoData } from '@/shared/ui/no-data/no-data';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { Typography } from '@/shared/ui/typography/typography';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const FamiliesUser = () => {
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


	return families.length !== 0 ? (
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
						variant='h2'
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
			colorText='secondary'
		/>
	);
};

const styleFamilyModal = StyleSheet.create({
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
