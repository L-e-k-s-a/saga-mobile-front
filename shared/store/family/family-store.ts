
import { Family } from "@/entities/family/family";
import { create } from "zustand";



export const useFamilyStore = create<Family>()((set) => ({
    activeFamilyUid: '',
    nameFamily: '',
    inviteCode: '',
    

    setFamily: (name: string) => set({nameFamily: name}),
    setInviteCode: (code: string) => set({inviteCode: code}),
    setActiveFamilyUid: (activeUid: string) => set({activeFamilyUid: activeUid})
}))