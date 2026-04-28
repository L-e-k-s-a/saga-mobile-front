import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { capitalize } from '@/shared/lib/capitalize';
import { DropDown } from '@/shared/ui/drop-down/drop-down';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { Typography } from '@/shared/ui/typography/typography';
import { StyleSheet } from 'react-native';
import { useGetFamilyMembers } from '../hooks/use-get-family-members';
import { useUserStore } from '@/shared/store/user/user-store';
import { useEffect } from 'react';

export const FamilyMembers = () => {
	const {
		data: familyMembers,
		isLoading,
		error,
	} = useGetFamilyMembers();

	if (error) {
		return;
	}

	if (!familyMembers) {
		return;
	}

	if (isLoading) return <Spinner />;

	return (
		<DropDown
			title='Члены семьи'
			content={
				<VerLayout styles={styleFamilyMember.list}>
					{familyMembers.map((member, index) => (
						<Typography
							variant='h3'
							key={index}>
							{capitalize(member.positionInFamily)}: {member.name}
						</Typography>
					))}
				</VerLayout>
			}
		/>
	);
};

const styleFamilyMember = StyleSheet.create({
	list: {
		paddingBottom: 10,
		gap: 5,
	},
});
