import { db } from "@/firebase/firebase"
import { Interest } from "@/shared/types/interest"
import { collection, getDocs, query, where } from "firebase/firestore"




export const getInterests = async (activeFamilyUid: string) => {
    const interestsQuery = query(
        collection(db, 'clubsInterested'),
        where('familyId', '==', activeFamilyUid)
    )

    const querySnapshot = await getDocs(interestsQuery)

    const interestsFamily: Interest[] = []

    querySnapshot.forEach((doc) => {
        const data = doc.data()
        interestsFamily.push({
            interesId: doc.id,
            familyId: data.familyId,
            title: data.title,
            moreDetails: data.moreDetails
        })
    })

    return interestsFamily
}