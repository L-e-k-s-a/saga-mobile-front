import { getUserFromFirebase } from '@/entities/user/lib/getUser';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { capitalize } from '@/shared/lib/capitalize';
import { useFamilyStore } from '@/shared/store/family/family-store';
import { FamilyMember } from '@/shared/types/family-member';
import { DropDown } from '@/shared/ui/drop-down/drop-down';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { Typography } from '@/shared/ui/typography/typography';
import { useEffect, useState } from 'react';
import { useGetFamilyMembers } from '../hooks/use-get-family-members';

export const FamilyMembers = () => {
	const { data: familyMembers, isLoading, error, refetch } = useGetFamilyMembers()
	
	if(error){
		return
	}

	if(!familyMembers){
		return 
	}

	if (isLoading) return <Spinner />

	return (
		<DropDown
			title='Члены семьи'
			content={
				<VerLayout>
					{familyMembers.map((member, index) => (
						<Typography variant='h3' key={index}>
							{capitalize(member.positionInFamily)}: {member.name}
						</Typography>
					))}
				</VerLayout>
			}
		/>
	);
};