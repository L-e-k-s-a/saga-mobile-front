import { realtime } from "@/firebase/firebase"
import { push, ref, serverTimestamp, set } from "firebase/database"



export const MESSAGES_PATH = 'messages'

export const sendMessage = async (text: string, senderId: string, role: string) => {
    try{
        const messagesRef = ref(realtime, MESSAGES_PATH)
        const newMessageRef = await push(messagesRef)

        await set(newMessageRef, {
            text, senderId, role, createAt: serverTimestamp()
        });
    } catch(error){
        console.error('Error sending message', error)
        throw error
    }
}