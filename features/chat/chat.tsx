import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
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

const { height } = Dimensions.get('screen');
export const Chat = () => {
	const { messages, loading, user, handleSend } = useChat();
	const [inputText, setInputText] = useState('');
	const keyboardOffset = useRef(new Animated.Value(0)).current;

	const sendMessage = () => {
        handleSend(inputText)
        setInputText('')
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

	return (
		<View style={styleChat.container}>
			<View style={styleChat.messages}>
				<DinamicScrollView maxHeight={height - 300}>
					{messages?.map((message: Message) => (
						<Typography>{message.text}</Typography>
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

const styleChat = StyleSheet.create({
	container: {
		flex: 1,
	},
	messages: {
		height: height - 300,
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
