import { useFamilyStore } from '@/shared/store/family/family-store';
import { useMe } from '@/shared/store/me/useMe';
import { Message } from '@/shared/types/message';
import { useEffect, useState } from 'react';
import { sendMessage } from '../lib/send-message';
import { subscribeToMessages } from '../lib/subscribe-to-messages';

export const useChat = () => {
	const [messages, setMessages] = useState<Message[]>();
	const [loading, setLoading] = useState(true);
	const user = useMe();
	const { role } = useFamilyStore();

	useEffect(() => {
		if (!user.uid) {
			return;
		}

		const unsubscribe = subscribeToMessages((newMessages) => {
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
			await sendMessage(text.trim(), user.uid, role);
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
