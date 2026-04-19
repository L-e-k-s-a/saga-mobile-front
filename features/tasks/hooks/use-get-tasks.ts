import { db } from "@/firebase/firebase"
import { Task } from "@/shared/types/task"
import { doc, getDoc } from "firebase/firestore"
import { useState, useEffect } from "react"

export const useGetTasks = (activeFamilyUid: string) => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const getTasks = async () => {
            if (!activeFamilyUid) {
                setTasks([])
                setLoading(false)
                return
            }

            try {
                const familyDocRef = doc(db, "families", activeFamilyUid)
                const familySnapshot = await getDoc(familyDocRef)
            
                if(!familySnapshot.exists()){
                    setTasks([])
                } else {
                    setTasks(familySnapshot.data().tasks || [])
                }
            } catch (err) {
                setError(err as Error)
                setTasks([])
            } finally {
                setLoading(false)
            }
        }
        getTasks()
    }, [activeFamilyUid])

    return { tasks, loading, error }
}