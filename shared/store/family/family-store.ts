import { Family } from '@/entities/family/type/family';
import { FamilyMember } from '@/shared/types/family-member';
import { create } from 'zustand';


type FamilyStore = {
	uid: string;
	nameFamily: string;
	inviteCode: string;
	role: string;
	familyMembers: FamilyMember[]

	setUid: (uid: string) => void;
	setNameFamily: (name: string) => void;
	setRole: (role: string) => void;
	setInviteCode: (code: string) => void;
	setFamilyMembers: (members: FamilyMember[]) => void;
	setFamily: (family: Family) => void
};

export const useFamilyStore = create<FamilyStore>()((set) => ({
	uid: '',
	nameFamily: '',
	inviteCode: '',
	role: '',
	familyMembers: [],


	setUid: (newUid: string) => set({ uid: newUid }),
	setNameFamily: (name: string) => set({ nameFamily: name }),
	setRole: (newRole: string) => set({ role: newRole }),
	setInviteCode: (code: string) => set({ inviteCode: code }),
	setFamilyMembers: (members: FamilyMember[]) => set({familyMembers: members}),
	setFamily: (family: Family) => set({...family})
}));
