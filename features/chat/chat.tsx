import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { useMe } from '@/shared/store/me/useMe';
import { styleForm } from '@/shared/styles/forms';
import { Message } from '@/shared/types/message';
import { DinamicScrollView } from '@/shared/ui/dinamic-scroll-view/dinamic-scroll-view';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/typography/typography';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
	Animated,
	Dimensions,
	Keyboard,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { useChat } from './hooks/use-chat';
import { useFamilyStore } from '@/shared/store/family/family-store';
import { useUserStore } from '@/shared/store/user/user-store';
import { NoData } from '@/shared/ui/no-data/no-data';

const { height } = Dimensions.get('window');
export const Chat = () => {
	const { messages, loading, user, handleSend } = useChat();
	const me = useMe();
	const [inputText, setInputText] = useState('');
	const keyboardOffset = useRef(new Animated.Value(0)).current;
	const { activeFamily } = useUserStore()

	const sendMessage = () => {
		handleSend(inputText);
		setInputText('');
	};

	useEffect(() => {
		const showSubscription = Keyboard.addListener(
			Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
			(event) => {
				const keyboardHeight = event.endCoordinates.height;

				Animated.timing(keyboardOffset, {
					toValue: -(keyboardHeight - 130),
					duration: event.duration || 250,
					useNativeDriver: true,
				}).start();
			},
		);
		const hideSubscription = Keyboard.addListener(
			Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
			(event) => {
				Animated.timing(keyboardOffset, {
					toValue: 0,
					duration: event.duration || 250,
					useNativeDriver: true,
				}).start();
			},
		);

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, [keyboardOffset]);


	if (!activeFamily) {
		return (
			<NoData
				title='Похоже Вы не состоите в семье'
				desctiption='Быстрее создайте или вступите в семью!'
			/>
		);
	}

	return (
		<View style={styleChat.container}>
			<View style={styleChat.messages}>
				<DinamicScrollView maxHeight={height - 300}>
					{messages?.map((message: Message) => (
						<View key={message.createAt} style={styleChat.containerMessage}>
							<Typography
								style={
									me.uid === message.senderId
										? styleChat.messageCurrentUser
										: styleChat.message
								}>
								{message.text}
							</Typography>
						</View>
					))}
				</DinamicScrollView>
			</View>
			<Animated.View style={{ transform: [{ translateY: keyboardOffset }] }}>
				<HorLayout style={styleChat.sendContainer}>
					<Input
						style={[styleForm.input, styleChat.sendInput]}
						value={inputText}
						onChangeText={setInputText}
						placeholder='Сообщение'
					/>
					<TouchableOpacity
						style={styleChat.sendButton}
						onPress={sendMessage}>
						<Ionicons
							name='arrow-up'
							size={32}
							color={COLORS.primary}
						/>
					</TouchableOpacity>
				</HorLayout>
			</Animated.View>
		</View>
	);
};

const messageCommon = {
	width: '60%',
	marginTop: 10,
	paddingVertical: 5,
	borderRadius: 10,
} as const;

const styleChat = StyleSheet.create({
	container: {
		flex: 1,
	},
	messages: {
		height: height - 300,
	},
	containerMessage: {
		width: '100%',
	},
	message: {
		backgroundColor: COLORS.secondary,
		alignSelf: 'flex-start',
		paddingStart: 10,
		...messageCommon,
	},
	messageCurrentUser: {
		backgroundColor: COLORS.teal,
		alignSelf: 'flex-end',
		textAlign: 'right',
		paddingEnd: 10,
		...messageCommon,
	},
	sendContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	sendInput: {
		width: '80%',
	},
	sendButton: {
		padding: 10,
		backgroundColor: COLORS.secondary,
		borderRadius: 10,
		marginTop: 8,
	},
});
