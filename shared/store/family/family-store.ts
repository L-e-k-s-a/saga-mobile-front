
import { Family } from "@/entities/family/family";
import { create } from "zustand";


type FamilyStore = {
    uid: string,
    nameFamily: string,
    inviteCode: string,
    role: string,

    setUid: (uid: string) => void,
    setNameFamily: (name: string) => void,
    setRole: (role: string) => void,
    setInviteCode: (code: string) => void

}

export const useFamilyStore = create<FamilyStore>()((set) => ({
    uid: '',
    nameFamily: '',
    inviteCode: '',
    role: '',
    
    setUid: (newUid: string) => set({uid: newUid}),
    setNameFamily: (name: string) => set({nameFamily: name}),
    setRole: (newRole: string) => set({role: newRole}),
    setInviteCode: (code: string) => set({inviteCode: code}),
}))