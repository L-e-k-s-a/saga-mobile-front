import { useFamilyStore } from '@/shared/store/family/family-store';
import { useUserStore } from '@/shared/store/user/user-store';
import { Family } from '../type/family';
import { getFamilyUser } from './get-family-user';

export const useSaveFamily = () => {
	const { setFamily } = useFamilyStore();
	const { activeFamily } = useUserStore();

	const saveFamily = async () => {
		const data = await getFamilyUser(activeFamily);
		if (data) {
			const family: Family = {
				uid: data.id,
				inviteCode: data.inviteCode,
				nameFamily: data.nameFamily,
				familyMembers: [],
			};
			setFamily(family);
            console.log(family)
		}
	};

	return { saveFamily };
};
