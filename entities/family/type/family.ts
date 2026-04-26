import { FamilyMember } from "@/shared/types/family-member"


export type Family = {
    uid: string,
    nameFamily: string,
    inviteCode: string,
    familyMembers: FamilyMember[]
}