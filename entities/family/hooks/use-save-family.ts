import { useFamilyStore } from '@/shared/store/family/family-store';
import { useUserStore } from '@/shared/store/user/user-store';
import { Family } from '../type/family';
import { getFamilyMembers } from './get-family-members';
import { getFamilyUser } from './get-family-user';

export const useSaveFamily = () => {
	const { setFamily } = useFamilyStore();
	const { activeFamily } = useUserStore();

	const saveFamily = async () => {
		const result = await getFamilyUser(activeFamily);
		if (result) {
			const family: Family = {
				uid: result.id,
				inviteCode: result.inviteCode,
				nameFamily: result.nameFamily,
				familyMembers: await getFamilyMembers(activeFamily),
			};
			setFamily(family);

		}
	};

	return { saveFamily };
};
