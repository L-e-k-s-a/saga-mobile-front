import { auth } from "@/firebase/firebase"
import { useAuthStore } from "../auth/auth"
import { useUserStore } from "../user/user-store"



export const useMe = () => {
    const user  = useUserStore()
    return user
}