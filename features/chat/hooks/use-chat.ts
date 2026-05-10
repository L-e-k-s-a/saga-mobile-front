import { useFamilyStore } from '@/shared/store/family/family-store';
import { useMe } from '@/shared/store/me/useMe';
import { Message } from '@/shared/types/message';
import { useEffect, useState } from 'react';
import { sendMessage } from '../lib/send-message';
import { subscribeToMessages } from '../lib/subscribe-to-messages';
import { useUserStore } from '@/shared/store/user/user-store';

export const useChat = () => {
	const [messages, setMessages] = useState<Message[]>();
	const [loading, setLoading] = useState(true);
	const user = useMe();
	const { role } = useFamilyStore();
    const { activeFamily, name } = useUserStore()
	useEffect(() => {
		if (!user.uid) {
			return;
		}

		const unsubscribe = subscribeToMessages(activeFamily, (newMessages) => {
			setMessages(newMessages);
			setLoading(false);
		});

		return unsubscribe();
	}, [user]);

	const handleSend = async (text: string) => {
		if (!text.trim()) {
			return;
		}

		try {
			await sendMessage(text.trim(), user.uid, role, name, activeFamily);
		} catch (error) {
			console.error('Faild to send message', error);
		}
	};

	return {
		messages,
		loading,
		user,
		handleSend,
	};
};
