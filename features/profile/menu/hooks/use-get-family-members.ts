import { getUserFromFirebase } from "@/entities/user/lib/getUser"
import { useFamilyStore } from "@/shared/store/family/family-store"
import { useUserStore } from "@/shared/store/user/user-store"
import { FamilyMember } from "@/shared/types/family-member"
import { useQuery } from "@tanstack/react-query"



export const useGetFamilyMembers = () => {
    const {activeFamily} = useUserStore()
    const {familyMembers} = useFamilyStore()

    const {data, isLoading, error, refetch} = useQuery({
        queryKey: ['familyMembersInProfie', activeFamily],
        queryFn: () => {
            const promises = familyMembers.map( async (member: FamilyMember) => {
                const person = await getUserFromFirebase(member.userId)
                return {
                    name: person.fullName,
                    positionInFamily: member.positionInFamily
                }
            })
            const members = Promise.all(promises)
            return members
        },
        enabled: !!familyMembers,
        staleTime: 0,
		refetchOnMount: true,
    })
    console.log('data', data )
    return {
        data, isLoading, error, refetch
    }
}