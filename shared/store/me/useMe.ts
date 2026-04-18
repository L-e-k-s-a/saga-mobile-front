import { auth } from "@/firebase/firebase"
import { useAuthStore } from "../auth/auth"



export const useMe = () => {
    const { user } = useAuthStore()
    return user
}