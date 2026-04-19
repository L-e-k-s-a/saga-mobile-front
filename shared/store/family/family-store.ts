
import { Family } from "@/entities/family/family";
import { create } from "zustand";


type FamilyStore = {
    nameFamily: string,
    inviteCode: string,
    role: string,

    setNameFamily: (name: string) => void,
    setRole: (role: string) => void,
    setInviteCode: (code: string) => void

}

export const useFamilyStore = create<FamilyStore>()((set) => ({
    nameFamily: '',
    inviteCode: '',
    role: '',
    

    setNameFamily: (name: string) => set({nameFamily: name}),
    setRole: (newRole: string) => set({role: newRole}),
    setInviteCode: (code: string) => set({inviteCode: code}),
}))