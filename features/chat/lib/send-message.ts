import { realtime } from '@/firebase/firebase';
import { push, ref, serverTimestamp, set, update } from 'firebase/database';

export const MESSAGES_PATH = 'messages';

export const sendMessage = async (
	text: string,
	senderId: string,
	role: string,
    familyId: string
) => {
	try {
		const messagesRef = ref(realtime, `${MESSAGES_PATH}/${familyId}`);
		const newMessageRef = await push(messagesRef);

		await update(newMessageRef, {
			text,
			senderId,
			role,
			createAt: Date.now(),
		});
	} catch (error) {
		console.error('Error sending message', error);
		throw error;
	}
};
