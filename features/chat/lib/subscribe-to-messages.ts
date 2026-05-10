import { realtime } from "@/firebase/firebase";
import { Message } from "@/shared/types/message";
import { off, onValue, orderByChild, query, ref } from "firebase/database";
import { MESSAGES_PATH } from "./send-message";





export const subscribeToMessages = (callback: (messages: Message[]) => void) => {
    const messageRef = ref(realtime, MESSAGES_PATH)

    const messageQuery = query(
        messageRef,
        orderByChild('createAt')
    )

    const unsubscribe = onValue(messageQuery, (snapshot) => {
        const messages: Message[] = []

        if(snapshot.exists()){
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val()
                messages.push({
                    id: childSnapshot.key as string,
                    text: data.text,
                    senderId: data.senderId,
                    role: data.role,
                    createAt: data.createAt || Date.now()
                })
            })
        }

        callback(messages)
    })

    return () => off(messageRef, 'value', unsubscribe)
}