import { getUserFromFirebase } from '@/entities/user/lib/getUser';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { capitalize } from '@/shared/lib/capitalize';
import { useFamilyStore } from '@/shared/store/family/family-store';
import { FamilyMember } from '@/shared/types/family-member';
import { DropDown } from '@/shared/ui/drop-down/drop-down';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { Typography } from '@/shared/ui/typography/typography';
import { useEffect, useState } from 'react';

export const FamilyMembers = () => {
	const { familyMembers } = useFamilyStore();
	const [membersWithNames, setMembersWithNames] = useState<Array<{name: string, positionInFamily: string}>>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMembers = async () => {
			setLoading(true);
			const membersData = await Promise.all(
				familyMembers.map(async (member: FamilyMember) => {
					const person = await getUserFromFirebase(member.userId);
					return {
						name: person.fullName || 'Unknown',
						positionInFamily: member.positionInFamily
					};
				})
			);
			setMembersWithNames(membersData);
			setLoading(false);
		};

		if (familyMembers.length > 0) {
			fetchMembers();
		}
	}, [familyMembers]);

	if (loading) return <Spinner />

	return (
		<DropDown
			title='Члены семьи'
			content={
				<VerLayout>
					{membersWithNames.map((member, index) => (
						<Typography variant='h3' key={index}>
							{capitalize(member.positionInFamily)}: {member.name}
						</Typography>
					))}
				</VerLayout>
			}
		/>
	);
};