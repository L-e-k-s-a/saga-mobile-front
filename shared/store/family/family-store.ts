import { Family } from "@/entities/family/Family";
import { create } from "zustand";



export const useFamilyStore = create<Family>()((set) => ({
    nameFamily: '',

    setFamily: (name: string) => set({nameFamily: name}) 
}))